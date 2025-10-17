// LÓGICA DE ENCRIPTACIÓN: Solo se preocupa por encriptar y mover rotores

import { ROTORES, REFLECTORES, estado } from "./constantes.js";
import { getIndice, getCaracter, convertirAIndices, registrarPaso } from "./utilidades.js";


// --- POSICIONES DE ROTORES: Patrón Observer ---
const observadoresPosiciones = [];

function suscribirPosiciones(callback) {
  observadoresPosiciones.push(callback);
}

function notificarPosiciones() {
  //Registra las posiciones actuales de los rotores
  const posiciones = {
    izquierdo: estado.rotorIzquierdo.posicion,
    medio: estado.rotorMedio.posicion,
    derecho: estado.rotorDerecho.posicion
  };
  
  //Notifica a los observadores de las posiciones actuales
  observadoresPosiciones.forEach(callback => callback(posiciones));
}

//---- LOGICA DE ENCRIPTACION ----

function cambiarEnchufe(caracter) {
  return estado.enchufes[caracter] || caracter;
}

function avanzarRotor(indiceLetra, rotor) {
  const cableadoRotor = convertirAIndices(ROTORES[rotor.tipo].cableado);
  const entrada = (indiceLetra + rotor.posicion) % 26;
  const salidaInterna = cableadoRotor[entrada];
  const salidaFinal = (salidaInterna - rotor.posicion + 26) % 26;

  return salidaFinal;
}

function retrocederRotor(indiceLetra, rotor) {
  const cableadoRotor = convertirAIndices(ROTORES[rotor.tipo].cableado);
  const entrada = (indiceLetra + rotor.posicion) % 26;
  const salidaInterna = cableadoRotor.indexOf(entrada);
  const salidaFinal = (salidaInterna - rotor.posicion + 26) % 26;

  return salidaFinal;
}

function reflejar(indiceLetra) {
  const reflector = REFLECTORES[estado.reflector];
  const indiceSalida = getIndice(reflector[indiceLetra]);

  return indiceSalida;
}

function moverRotores() {
  const { rotorDerecho, rotorMedio, rotorIzquierdo } = estado;

  const muescaDerecho = getIndice(ROTORES[rotorDerecho.tipo].muesca);
  const muescaMedio = getIndice(ROTORES[rotorMedio.tipo].muesca);

  // Avance de rotores
  rotorDerecho.posicion = (rotorDerecho.posicion + 1) % 26;
    
  if (rotorDerecho.posicion === muescaDerecho || rotorMedio.posicion === muescaMedio) {
    rotorMedio.posicion = (rotorMedio.posicion + 1) % 26;

    if (rotorMedio.posicion === muescaMedio) 
      rotorIzquierdo.posicion = (rotorIzquierdo.posicion + 1) % 26;  
  }
}

function encriptar(caracter) {
  const pasos = [];  

  // 0. Avance de rotores
  moverRotores();
  notificarPosiciones();

  // 1. [Plugboard]
  const plugLetra = cambiarEnchufe(caracter);
  let indiceActual = getIndice(plugLetra);
  
  registrarPaso(pasos, 'plug-in', indiceActual);
    
  // 2. [Rotor Derecho]
  indiceActual = avanzarRotor(indiceActual, estado.rotorDerecho);
  registrarPaso(pasos, 'Derecho →', indiceActual);
  // 3. [Rotor Medio]
  indiceActual = avanzarRotor(indiceActual, estado.rotorMedio);
  registrarPaso(pasos, 'Medio →', indiceActual);
  // 4. [Rotor Izquierdo]
  indiceActual = avanzarRotor(indiceActual, estado.rotorIzquierdo);
  registrarPaso(pasos, 'Izquierdo →', indiceActual);

  // 5. [Reflector]
  indiceActual = reflejar(indiceActual);
  registrarPaso(pasos, 'Reflejar', indiceActual);

  // 6. [Rotor Izquierdo]
  indiceActual = retrocederRotor(indiceActual, estado.rotorIzquierdo);
  registrarPaso(pasos, 'Izquierdo ←', indiceActual);
  // 7. [Rotor Medio]
  indiceActual = retrocederRotor(indiceActual, estado.rotorMedio);
  registrarPaso(pasos, 'Medio ←', indiceActual);
  // 8. [Rotor Derecho]
  indiceActual = retrocederRotor(indiceActual, estado.rotorDerecho);
  registrarPaso(pasos, 'Derecho ←', indiceActual);

  // 9. [Plugboard]
  const salidaLetra = cambiarEnchufe(getCaracter(indiceActual));
  registrarPaso(pasos, 'plug-out', indiceActual);

  return { salidaLetra, pasos };
}

export { encriptar, suscribirPosiciones };


// --- PRUEBAS
/*
  { 
    salidaLetra: 'A', 
    pasos: [ 
      { paso: 'plug-in', valor: 'B' }, 
      { paso: 'Derecho →', valor: 'E' }, 
      { paso: 'Medio →', valor: 'S' }, 
      { paso: 'Izquierdo →', valor: 'S' }, 
      { paso: 'Reflejar', valor: 'F' }, 
      { paso: 'Izquierdo ←', valor: 'D' }, 
      { paso: 'Medio ←', valor: 'C' }, 
      { paso: 'Derecho ←', valor: 'A' }, 
      { paso: 'plug-out', valor: 'A' } 
    ] 
  }
*/
//console.log(encriptar('B'))

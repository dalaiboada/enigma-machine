// 👥 "LECTOR" - ui.js
import { suscribirPosiciones, encriptar } from '../enigmaCore.js';
import { getCaracter } from '../utilidades.js';

// Esta función quiere enterarse de los cambios
/* function actualizarUI(posiciones) {
  document.getElementById('rotor-izquierdo').textContent = posiciones.izquierdo;
  document.getElementById('rotor-medio').textContent = posiciones.medio;
  document.getElementById('rotor-derecho').textContent = posiciones.derecho;
} */

// LISTENER DE PRUEBA PARA CONSOLA
// Suscribirse a cambios de posiciones
function actualizarUI(posiciones) {
  console.log('[UIManager] Posiciones recibidas:', posiciones);
  console.log(`   Izquierdo: ${posiciones.izquierdo} (${getCaracter(posiciones.izquierdo)})`);
  console.log(`   Medio: ${posiciones.medio} (${getCaracter(posiciones.medio)})`);
  console.log(`   Derecho: ${posiciones.derecho} (${getCaracter(posiciones.derecho)})`);
}

suscribirPosiciones(actualizarUI);

console.log('\nProbando encriptación ...');
console.log(encriptar('B').salidaLetra);
console.log(encriptar('C').salidaLetra);
console.log(encriptar('D').salidaLetra);
console.log(encriptar('E').salidaLetra);
console.log(encriptar('F').salidaLetra);




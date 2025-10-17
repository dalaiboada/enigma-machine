import { ALFABETO } from "./constantes.js";

/*
  idx(c)
*/
function getIndice(caracter){ return ALFABETO.indexOf(caracter); }

/*
  chr(i)
*/
function getCaracter(indice){ return ALFABETO[(indice + 26) % 26]; }


/*
  wiringMap(w)
*/
function convertirAIndices(cadena) { 
	return cadena.split('').map(caracter => 
		getIndice(caracter)
	);
}

/**
 * Función auxiliar para registrar un paso en el camino (pasos) de codificación.
 * @param {Array} pasos	 - El array donde se registran los pasos.
 * @param {string} nombreEtapa - Nombre legible de la etapa (ej: 'Rotor Medio →').
 * @param {number} nuevoIndice - El índice (0-25) resultante de la operación.
 */
function registrarPaso(pasos, nombreEtapa, nuevoIndice) {
    pasos.push({
      paso: nombreEtapa,
      valor: getCaracter(nuevoIndice)
    });
}

export { getIndice, getCaracter, convertirAIndices, registrarPaso };
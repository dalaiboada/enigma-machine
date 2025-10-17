import { ALFABETO } from "./constantes.js";

const getIndice = caracter => ALFABETO.indexOf(caracter); 

const getCaracter = indice => ALFABETO[(indice + 26) % 26]; 

const convertirAIndices = cadena => { 
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
const registrarPaso = (pasos, nombreEtapa, nuevoIndice) => {
  pasos.push({
    paso: nombreEtapa,
    valor: getCaracter(nuevoIndice)
  });
}

export { getIndice, getCaracter, convertirAIndices, registrarPaso };
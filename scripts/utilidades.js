import { ALFABETO } from "./constantes.js";

// Devuelve el indice del carácter en el alfabeto
const getIndice = caracter => ALFABETO.indexOf(caracter); 

// Devuelve el carácter correspondiente al indice
const getCaracter = indice => ALFABETO[(indice + 26) % 26]; 

// Devuelve un array de indices correspondientes a la cadena
const convertirAIndices = cadena => { 
	return cadena.split('').map(caracter => 
		getIndice(caracter)
	);
}

// Registra un paso en el array de pasos
const registrarPaso = (
  pasos, // Array de pasos { paso: string, valor: string }
  nombreEtapa, // Nombre legible de la etapa (ej: 'Rotor Medio →')
  nuevoIndice, // El índice (0-25) resultante de la operación
) => {
  pasos.push({
    paso: nombreEtapa,
    valor: getCaracter(nuevoIndice)
  });
}

export { getIndice, getCaracter, convertirAIndices, registrarPaso };
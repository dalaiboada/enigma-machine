import { encriptar } from '../enigma-core.js';

const $textoPlano = document.getElementById('texto-plano');
const $textoCifrado = document.getElementById('texto-cifrado');

const manejarInputTeclado = event => {
  const tecla = event.key;
  let textoActual = $textoPlano.innerText;
  let textoCifradoActual = $textoCifrado.value || '';

  // Evitar que el evento se propague si es una tecla que manejamos
  if (['Backspace', 'Enter', ' '].includes(tecla) || 
      (tecla.length === 1 && /^[a-zA-Z0-9.,!\-() ]$/.test(tecla))) {
    event.preventDefault();
  }

  switch (tecla) {
    case 'Backspace':
      $textoPlano.innerText = textoActual.slice(0, -1);
      $textoCifrado.value = textoCifradoActual.slice(0, -1);
      break;
    case 'Enter':
      $textoPlano.innerText += '\n';
      $textoCifrado.value += '\n';
      break;
    case ' ':
      $textoPlano.innerText += ' ';
      $textoCifrado.value += ' ';
      break;
    default:
      if (tecla.length === 1 && /^[a-zA-Z0-9.,!\-() ]$/.test(tecla)) {
        const nuevaLetra = tecla.toUpperCase();
        $textoPlano.innerText += nuevaLetra;
        const letraCifrada = encriptar(nuevaLetra).salidaLetra.toUpperCase();
        $textoCifrado.value += letraCifrada;
        $textoCifrado.scrollTop = $textoCifrado.scrollHeight;
      }
      break;
  }
}

document.addEventListener('keydown', manejarInputTeclado);
import { ALFABETO } from '../constantes.js';

const TECLADO = [
  ['Q', 'W', 'E', 'R', 'T', 'Y', 'U', 'I', 'O', 'P'],
  ['A', 'S', 'D', 'F', 'G', 'H', 'J', 'K', 'L'],
  ['Z', 'X', 'C', 'V', 'B', 'N', 'M']
];

const renderizarTeclado = () => {
	const $tecladoFilas = document.querySelectorAll('.teclado-fila');

	TECLADO.forEach((filaArray, i) => {
    const $teclas = filaArray.map(tecla => 
      `<div class="tecla">${tecla}</div>`
    ).join(''); 

    $tecladoFilas[i].innerHTML = $teclas;
  });
}

const renderizarLampboard = () => {
  const $lampboard = document.getElementById('lampboard');
  const fragmento = document.createDocumentFragment();
  
  [...ALFABETO].forEach(letra => {
    const $lamp = document.createElement('div');
    $lamp.classList.add('lamp');
    
    $lamp.textContent = letra;
    fragmento.appendChild($lamp);
  });
  
  $lampboard.appendChild(fragmento);
}


renderizarTeclado();
renderizarLampboard();


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

/* 
<label class="plug">
  <input type="checkbox">
  <div class="marcador">
    <span class="letra">A</span>
  </div>
</label>

Label.plug(input[type="checkbox"] + div.marcador(span.letra))
*/
const renderizarPlugboard = () =>  {
  const fragmento = document.createDocumentFragment();
  const $plugboard = document.querySelector('.plugboard');
  $plugboard.innerHTML = '';
  
  [...ALFABETO].forEach(letra => {
    
    const $plug = document.createElement('label');
    $plug.classList.add('plug')
    
    const $checkbox = document.createElement('input');
    $checkbox.type = 'checkbox';
    
    const $marcador = document.createElement('div');
    $marcador.classList.add('marcador');
    
    const $spanLetra = document.createElement('span');
    $spanLetra.classList.add('letra');
    
    $spanLetra.textContent = letra;
    $marcador.appendChild($spanLetra);
    $plug.appendChild($checkbox);
    $plug.appendChild($marcador);
    
    fragmento.appendChild($plug);
  });
  
  $plugboard.appendChild(fragmento);
}

renderizarTeclado();
renderizarLampboard();
renderizarPlugboard();


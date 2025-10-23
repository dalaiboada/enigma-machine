import { ALFABETO } from "../constantes.js";

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
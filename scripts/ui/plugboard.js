import { ALFABETO } from "../constantes.js";

const renderizarPlugboard = () =>  {
  const fragmento = document.createDocumentFragment();
  const $plugboard = document.querySelector('.plugboard');
  $plugboard.innerHTML = '';
  
  [...ALFABETO].forEach(letra => {
    
    const $plug = document.createElement('label');
    $plug.classList.add('plug');
    $plug.setAttribute('data-letra', letra);
    
    const $checkbox = document.createElement('input');
    $checkbox.type = 'checkbox';
    $checkbox.id = `plug-${letra}`;
    
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
  /* TODO: Agregar evento para actualizar el estado de los plugs */
}

renderizarPlugboard();
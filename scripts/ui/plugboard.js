import { ALFABETO } from "../constantes.js";

/* 
<label class="plug" data-letra="A">
  <input type="checkbox" id="plug-A">
  <div class="marcador">
    <span class="letra">A</span>
  </div>
</label>
*/
const crearPlug = letra => {
  // <label>
  const $plug = document.createElement('label');
  $plug.classList.add('plug');
  $plug.setAttribute('data-letra', letra);

  // <input type="checkbox">
  const $checkbox = document.createElement('input');
  $checkbox.type = 'checkbox';
  $checkbox.id = `plug-${letra}`;
  
  // <div>.marcador
  const $marcador = document.createElement('div');
  $marcador.classList.add('marcador');
  
  // <span>.letra
  const $spanLetra = document.createElement('span');
  $spanLetra.classList.add('letra');
  $spanLetra.textContent = letra;

  $marcador.appendChild($spanLetra);
  $plug.appendChild($checkbox);
  $plug.appendChild($marcador);
  
  return $plug;
}

const renderizarPlugboard = () =>  {
  const fragmento = document.createDocumentFragment();
  const $plugboard = document.querySelector('.plugboard');
  $plugboard.innerHTML = '';
  
  [...ALFABETO].forEach(letra => {
    const $plug = crearPlug(letra);

    /* TODO: Añadir funciones manejadoras de eventos a los plugs*/
    fragmento.appendChild($plug);
  });
  
  $plugboard.appendChild(fragmento);
  /* TODO: Agregar evento para actualizar el estado de los plugs */
}

renderizarPlugboard();
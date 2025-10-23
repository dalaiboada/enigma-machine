import { ALFABETO } from "../constantes.js";

let estadoPlugboard = {};
let plugboardSeleccionado = null;

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

    $plug.addEventListener('click', event => 
      manejarClicPlug(letra)
    );

    fragmento.appendChild($plug);
  });
  
  $plugboard.appendChild(fragmento);
  renderizarCables();
}

/* PRINCIPAL */
const manejarClicPlug = letra => {
  console.log('Manejar clic plug', letra);
}

/* MANEJO LÓGICO DE ESTADOS */
const crearConexion = (letra1, letra2) => {
  console.log('Creando conexion', letra1, letra2);
}

const eliminarConexion = (letra1, letra2) => {
  console.log('Eliminando conexion', letra1, letra2);
}

/* INTERFAZ */
const renderizarCables = () => {
  console.log('Dibujando cablecito');
}

const eliminarConexionUI = (letra1, letra2) => {
  console.log('Eliminando cablecito', letra1, letra2);
}

const actualizarListaConexionesUI = () => {
  console.log('Actualizando lista de conexiones');
}

const actualizarEstadoPlugUI = () => {
  console.log('Actualizando estado de plug');
}

const resetearPlugboardUI = () => {
  console.log('Resetear plugboard');
}

renderizarPlugboard();
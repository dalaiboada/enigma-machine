import { ALFABETO } from "../constantes.js";

let estadoPlugboard = {};
let plugSeleccionado = null;

/* TODO: 
  - Crear un observador para notificar cambios de estado
  - [OPCIONAL] MEJORAR FUNCIÓN DE ORQUESTACIÓN: manejarClicPlug
*/

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

    $plug.addEventListener('click', event => {
        event.preventDefault();
        manejarClicPlug(letra);
      }
    );

    fragmento.appendChild($plug);
  });
  
  $plugboard.appendChild(fragmento);
  actualizarEstadoPlugsUI();
}

/* PRINCIPAL */
const manejarClicPlug = letra => {
  console.log('Manejar clic plug', letra);

  const estaConectada = letra in estadoPlugboard;

  if(plugSeleccionado === null){
    if(!estaConectada){
      plugSeleccionado = letra;

      console.log('\nHa seleccionado una letra nueva,', letra);
      document.querySelector(`[data-letra="${letra}"]`).classList.add('seleccionado');
    }
    else {
      const pareja = estadoPlugboard[letra];
      console.log(`CONECTADO: ${letra} ↔ ${pareja}`);
      console.log("pareja: ", letra);
    }
  } else if(plugSeleccionado === letra){
    console.log("La letra, " + letra + " ya ha sido seleccionada");

    plugSeleccionado = null;
    document.querySelector(`[data-letra="${letra}"]`).classList.remove('seleccionado');
  } else {
    if(estaConectada){
      console.log('esta conectada');
      return;
    }

    crearConexion(plugSeleccionado, letra);
    plugSeleccionado = null;
    document.querySelector(`[data-letra="${selectedPlug}"]`).classList.remove('seleccionado');
  }

  actualizarEstadoPlugsUI();
  actualizarListaConexionesUI();  
}

/* MANEJO LÓGICO DE ESTADOS */
const crearConexion = (letra1, letra2) => {
  console.log('Creando conexion', letra1, letra2);

  Object.keys(estadoPlugboard).forEach(key => {
    if (estadoPlugboard[key] === letra1 || estadoPlugboard[key] === letra2) {
      eliminarConexionUI(key, estadoPlugboard[key]);
      delete estadoPlugboard[key];
    }
  });

  if (letra1 in estadoPlugboard) {
    eliminarConexionUI(letra1, estadoPlugboard[letra1]);
    delete estadoPlugboard[letra1];
  }
  if (letra2 in estadoPlugboard) {
    eliminarConexionUI(letra2, estadoPlugboard[letra2]);
    delete estadoPlugboard[letra2];
  }

  //Crear conexión
  estadoPlugboard[letra1] = letra2;
  estadoPlugboard[letra2] = letra1;

  renderizarCables();
  actualizarListaConexionesUI();
}

const eliminarConexion = (letra1, letra2) => {
  console.log('Eliminando conexion', letra1, letra2);

  eliminarConexionUI(letra1, letra2);
  delete estadoPlugboard[letra1];
  delete estadoPlugboard[letra2];
  
  actualizarEstadoPlugsUI();
  renderizarCables();
  actualizarListaConexionesUI();
}

/* INTERFAZ */
const renderizarCables = () => {
  console.log('Dibujando cablecito');

  const svg = document.querySelector('.conexiones');
  svg.innerHTML = '';
  
  Object.keys(estadoPlugboard).forEach(letra1 => {
    const letra2 = estadoPlugboard[letra1];
    
    // Solo dibujar una vez por par
    if (letra1 < letra2) {
      const plug1 = document.querySelector(`[data-letra="${letra1}"]`);
      const plug2 = document.querySelector(`[data-letra="${letra2}"]`);
      
      if (plug1 && plug2) {
        const rect1 = plug1.getBoundingClientRect();
        const rect2 = plug2.getBoundingClientRect();
        const svgRect = svg.getBoundingClientRect();
        
        const x1 = rect1.left + rect1.width/2 - svgRect.left;
        const y1 = rect1.top + rect1.height/2 - svgRect.top;
        const x2 = rect2.left + rect2.width/2 - svgRect.left;
        const y2 = rect2.top + rect2.height/2 - svgRect.top;
        
        const line = document.createElementNS('http://www.w3.org/2000/svg', 'line');
        line.setAttribute('x1', x1);
        line.setAttribute('y1', y1);
        line.setAttribute('x2', x2);
        line.setAttribute('y2', y2);
        line.classList.add('conexion-activa');
        
        svg.appendChild(line);
      }
    }
  });
}

const eliminarConexionUI = (letra1, letra2) => {
  console.log('Eliminando cablecito ui', letra1, letra2);

  document.querySelector(`[data-letra="${letra1}"]`).classList.remove('conectado');
  document.querySelector(`[data-letra="${letra2}"]`).classList.remove('conectado');
}

const actualizarListaConexionesUI = () => {
  console.log('Actualizando lista de conexiones');

  const lista = document.getElementById('lista-conexiones');
  lista.innerHTML = '';
  
  const conexionesMostradas = new Set();
  
  Object.keys(estadoPlugboard).forEach(letra1 => {
    const letra2 = estadoPlugboard[letra1];
    
    // Evitar duplicados
    if (!conexionesMostradas.has(letra1) && !conexionesMostradas.has(letra2)) {
      conexionesMostradas.add(letra1);
      conexionesMostradas.add(letra2);
      
      const item = document.createElement('div');
      item.classList.add('conexion-item');

      item.innerHTML = `
        <span>${letra1} ↔ ${letra2}</span>
        <button class="eliminar-conexion" data-letra1="${letra1}" data-letra2="${letra2}">×</button>
      `;
      
      lista.appendChild(item);
    }
  });
  
  // Añadir event listeners a los botones de eliminar
  document.querySelectorAll('.eliminar-conexion').forEach(boton => {
    boton.addEventListener('click', (e) => {
      e.stopPropagation();
      const letra1 = boton.getAttribute('data-letra1');
      const letra2 = boton.getAttribute('data-letra2');
      eliminarConexion(letra1, letra2);
    });
  });
}

const actualizarEstadoPlugsUI = () => {
  console.log('Actualizando estado de plugs');

  // Resetear todos los plugs
  document.querySelectorAll('.plug').forEach(plug => {
    plug.classList.remove('conectado', 'seleccionado');
  });
  
  // Marcar los plugs conectados
  Object.keys(estadoPlugboard).forEach(letra => {
    document.querySelector(`[data-letra="${letra}"]`).classList.add('conectado');
  });
  
  // Si hay un plug seleccionado se marcar
  if (plugSeleccionado) {
    document.querySelector(`[data-letra="${plugSeleccionado}"]`).classList.add('seleccionado');
  }
}

const resetearPlugboardUI = () => {
  console.log('Resetear plugboard');

  estadoPlugboard = {};
  plugSeleccionado = null;
  actualizarEstadoPlugsUI();
  renderizarCables();
  actualizarListaConexionesUI();
}

renderizarPlugboard();
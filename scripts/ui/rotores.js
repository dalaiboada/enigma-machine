import { ALFABETO, estado } from '../constantes.js'

const ROTORES_ESTADO = [
  estado.rotorDerecho, 
  estado.rotorMedio, 
  estado.rotorIzquierdo
];

/* --- FUNCIONES DE INTERFAZ (UI) --- */

const actualizarIndicadoresPosicion = () => {
  console.log('Actualizando indicadores de posición UI...');
  
  for (let i = 1; i <= 3; i++) {
    const rotor = ROTORES_ESTADO[i - 1];
    
    const $indicador = document.querySelector(`#rotor-${i}_contenedor .indicador-posicion`);
    
    $indicador.textContent = ALFABETO[rotor.posicion];
  }
};

const renderizarMarcasRotores = () => {
  console.log('Renderizando marcas de rotores...');
  
  for (let i = 1; i <= 3; i++) {
    const $marcasContenedor = document.getElementById(`marcas-rotor-${i}`);

    $marcasContenedor.innerHTML = '';
    
    // Crear marcas alrededor del disco (26 posiciones)
    for (let j = 0; j < 26; j++) {
      const $marca = document.createElement('div');
      $marca.classList.add('marca-rotor');

      if (j === 0) $marca.classList.add('principal');
      $marca.style.transform = `rotate(${j * (360 / 26)}deg)`;

      $marcasContenedor.appendChild($marca);
    }
  }
    
  actualizarIndicadoresPosicion();
};

/* --- FUNCIÓN DE LÓGICA (ESTADO) --- */
const girarRotor = (numeroRotor, direccion) => {
  console.log(`Girar rotor ${numeroRotor} en dirección ${direccion}`);
  
  const $rotorContenedor = document.getElementById(`rotor-${numeroRotor}_contenedor`);
  $rotorContenedor.classList.add('girando');
  
  const rotor = ROTORES_ESTADO[numeroRotor - 1]; 
  rotor.posicion = (rotor.posicion + direccion + 26) % 26;
  
  if (direccion > 0 && rotor.posicion === 0 && numeroRotor < 3) {
    setTimeout(() => girarRotor(numeroRotor + 1, 1), 300);
  }
  
  setTimeout(() => {
    renderizarMarcasRotores(); 
    $rotorContenedor.classList.remove('girando');
  }, 500);
};

document.addEventListener('DOMContentLoaded', () => {
  const $botonesRotor = document.querySelectorAll('.btn-rotor'); 

  $botonesRotor.forEach(boton => {
    boton.addEventListener('click', () => {
      const numeroRotor = parseInt(boton.getAttribute('data-rotor'));
      const direccion = parseInt(boton.getAttribute('data-direccion'));

      girarRotor(numeroRotor, direccion); 
    });
  });
});


renderizarMarcasRotores();
import { getCaracter } from '../utilidades.js'

const actualizarRotores = (posiciones) => {
  const $rotorDerecho = document.getElementById('rotor-derecho');
  const $rotorMedio = document.getElementById('rotor-medio');
  const $rotorIzquierdo = document.getElementById('rotor-izquierdo');

  $rotorDerecho.innerText = getCaracter(posiciones.derecho);
  $rotorMedio.innerText = getCaracter(posiciones.medio);
  $rotorIzquierdo.innerText = getCaracter(posiciones.izquierdo);
}

export { actualizarRotores };

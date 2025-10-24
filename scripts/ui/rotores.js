import { ALFABETO, estado } from '../constantes.js'
import { getCaracter } from '../utilidades.js'
import { notificarPosiciones } from '../enigma-core.js'

const ROTORES_ESTADO = [
  estado.rotorIzquierdo,
  estado.rotorMedio, 
  estado.rotorDerecho, 
];


/* --- FUNCIONES DE INTERFAZ (UI) --- */

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

  estado[ROTORES_ESTADO[numeroRotor - 1].posicion] = rotor.posicion;
  notificarPosiciones();
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

const actualizarRotores = (posiciones) => {
  const $rotorDerecho = document.getElementById('rotor-3_indicador');
  const $rotorMedio = document.getElementById('rotor-2_indicador');
  const $rotorIzquierdo = document.getElementById('rotor-1_indicador');

  $rotorDerecho.innerText = getCaracter(posiciones.derecho);
  $rotorMedio.innerText = getCaracter(posiciones.medio);
  $rotorIzquierdo.innerText = getCaracter(posiciones.izquierdo);
}

export { actualizarRotores };

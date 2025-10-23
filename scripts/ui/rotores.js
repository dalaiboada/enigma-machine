import { ALFABETO, estado } from '../constantes.js'

console.log('hola rotores', estado.rotorDerecho.posicion);


const actualizarIndicadoresPosicion = () => {
  for (let i = 1; i <= 3; i++) {
    const $indicador = document.querySelector(`#rotor-${i}_contenedor .indicador-posicion`);
    $indicador.textContent = ALFABETO[posicionesRotores[i-1]];
  }
};

const renderizarRotores = () => {
  for (let i = 1; i <= 3; i++) {
    const $marcasContenedor = document.getElementById(`marcas-rotor-${i}`);
    $marcasContenedor.innerHTML = '';
    
    // Crear marcas alrededor del disco
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


renderizarRotores();
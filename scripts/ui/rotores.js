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
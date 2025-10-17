import { suscribirPosiciones, encriptar } from './scripts/enigma-core.js';
import { getCaracter } from './scripts/utilidades.js';

function actualizarUI(posiciones) {
  console.log('[UIManager] Posiciones recibidas:', posiciones);
  console.log(`   Izquierdo: ${posiciones.izquierdo} (${getCaracter(posiciones.izquierdo)})`);
  console.log(`   Medio: ${posiciones.medio} (${getCaracter(posiciones.medio)})`);
  console.log(`   Derecho: ${posiciones.derecho} (${getCaracter(posiciones.derecho)})`);
}

suscribirPosiciones(actualizarUI);

console.clear();
console.log('\n--- Simulación de encriptación ---');
const letra = 'A';
console.log(`Encriptando letra: ${letra} -> ${encriptar(letra).salidaLetra}`);
console.log(`Encriptando letra: ${letra} -> ${encriptar(letra).pasos}`);




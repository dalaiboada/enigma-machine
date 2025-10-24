import './socket.js';

// UI componentes
import './ui/renderizar-maquina.js';
import './ui/texto-plano.js';
import './ui/plugboard.js';

// Logica
import { suscribirPosiciones } from './enigma-core.js';
import { actualizarRotores } from './ui/rotores.js';

// Suscribirse a las posiciones de los rotores
suscribirPosiciones(actualizarRotores);

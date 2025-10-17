# Documentación del Módulo Enigma Core

## Visión General

El módulo `enigma-core.js` implementa la lógica central de cifrado de la máquina Enigma, manejando la mecánica de los rotores, conexiones del panel de conexiones (plugboard) y el reflector.

Sigue los principios de funcionamiento de la máquina Enigma histórica mientras proporciona una implementación limpia y modular en JavaScript.

## Tabla de Contenidos

- [Dependencias](#dependencias)
- [Conceptos Básicos](#conceptos-básicos)
- [Referencias](#referencias)
- [Proceso de Cifrado](#proceso-de-cifrado)
- [Patrón Observador](#patrón-observador)
- [Funciones Auxiliares](#funciones-auxiliares)
- [Gestión del Estado](#gestión-del-estado)

## Dependencias

- `./constantes.js`: Contiene las configuraciones de los rotores y reflectores
- `./utilidades.js`: Proporciona funciones de utilidad para conversión de caracteres/índices y registro

## Conceptos Básicos

### Sistema de Rotores

- Implementa tres rotores: izquierdo, medio y derecho
- Cada rotor puede ser de diferentes tipos (I-V) con cableado único
- Los rotores giran en cascada, similar a un odómetro

### Panel de Conexiones (Plugboard)

- Implementa un panel de conexiones configurable para sustituciones de letras
- Cada letra puede ser intercambiada con exactamente una letra distinta

### Reflector

- Implementa un reflector fijo que redirige la corriente de vuelta a través de los rotores
- Asegura que el cifrado y descifrado usen el mismo proceso

## Referencias

### `encriptar(caracter)`

Cifra un único carácter a través de la máquina Enigma.

**Parámetros:**

- `caracter` (string): Un único carácter a cifrar

**Retorna:**

- `Object`: Contiene:
  - `salidaLetra` (string): El carácter cifrado
  - `pasos` (Array): Pasos detallados del proceso de cifrado

### `suscribirPosiciones(callback)`

Impementación de `Patrón de diseño Observer`

Suscribe una función de retorno a los cambios de posición de los rotores. 

Con esta funcion otros objetos (como la interfaz) podrán ser notificados para que realicen acciones una vez que se encripte una letra

**Parámetros:**

- `callback` (Función): Función a llamar cuando cambian las posiciones de los rotores

**Parámetros del Callback:**

- `posiciones` (Object): Contiene las posiciones actuales de todos los rotores
  - `izquierdo` (number): Posición del rotor izquierdo (0-25)
  - `medio` (number): Posición del rotor medio (0-25)
  - `derecho` (number): Posición del rotor derecho (0-25)

## Proceso de Cifrado

El cifrado sigue estos pasos:

1. **Movimiento de los Rotores**: Los rotores avanzan antes de cada cifrado
2. **Entrada al Panel de Conexiones**: El carácter pasa por el panel de conexiones
3. **Trayectoria de Derecha a Izquierda**:
   - Rotor Derecho (hacia adelante)
   - Rotor Medio (hacia adelante)
   - Rotor Izquierdo (hacia adelante)
4. **Reflexión**: La señal se refleja
5. **Trayectoria de Izquierda a Derecha**:
   - Rotor Izquierdo (hacia atrás)
   - Rotor Medio (hacia atrás)
   - Rotor Derecho (hacia atrás)
6. **Salida del Panel de Conexiones**: Sustitución final del carácter

## Patrón Observador

El módulo implementa el patrón Observador para notificar a los suscriptores sobre cambios en la posición de los rotores. Se utiliza principalmente para actualizaciones de la interfaz de usuario.

## Funciones Auxiliares

### `avanzarRotor(indiceLetra, rotor)`

Procesa un carácter a través de un rotor en dirección hacia adelante.

### `retrocederRotor(indiceLetra, rotor)`

Procesa un carácter a través de un rotor en dirección hacia atrás.

### `reflejar(indiceLetra)`

Procesa un carácter a través del reflector.

### `moverRotores()`

Maneja la lógica de movimiento de los rotores, incluyendo el doble paso.

## Gestión del Estado

El módulo mantiene su estado en un objeto `estado` que incluye:

- Configuraciones de los rotores (tipo y posición de cada rotor)
- Configuración del panel de conexiones
- Tipo de reflector actual

## Manejo de Errores

El módulo espera una entrada válida (A-Z) y no incluye validación de entrada. Es responsabilidad del llamante asegurar el formato correcto de la entrada.

## Ejemplo de Uso

```javascript
import { encriptar, suscribirPosiciones } from '../scripts/enigma-core.js';

// Suscribirse a cambios de posición de los rotores
suscribirPosiciones((posiciones) => {
  console.log('Posiciones actualizadas:', posiciones);
});

// Cifrar un carácter
const resultado = encriptar('A');
console.log('Letra cifrada:', resultado.salidaLetra);
console.log('Pasos detallados:', resultado.pasos);
```

## Notas

- El módulo usa indexación basada en 0 para las posiciones de los rotores (0-25)
- La codificación de caracteres no distingue entre mayúsculas y minúsculas, pero espera letras mayúsculas
- El módulo no maneja caracteres no alfabéticos; estos deben filtrarse antes del procesamiento

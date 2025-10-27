# Simulador de Máquina Enigma

Un simulador web de la famosa Máquina Enigma utilizada durante la Segunda Guerra Mundial para el cifrado y descifrado de mensajes secretos.

## Estructura del Proyecto

```bash
enigma-machine/
├── public/                    # Archivos estáticos
│   └── apple-logo.png         # Logo de la aplicación
│
├── scripts/                   # Código principal de la aplicación
│   ├── ui/                    # Componentes de la interfaz de usuario
│   │   ├── plugboard.js       # Panel de conexiones (plugboard)
│   │   ├── renderizar-maquina.js # Renderizado de la máquina
│   │   ├── rotores.js         # Lógica de los rotores
│   │   └── texto-plano.js     # Entrada/salida de texto
│   │
│   ├── constantes.js          # Constantes y configuraciones
│   ├── enigma-core.js         # Lógica principal de la Máquina Enigma
│   ├── main.js                # Punto de entrada de la aplicación
│   ├── socket.js              # Comunicación WebSocket
│   └── utilidades.js          # Funciones de utilidad
│
├── server/                    # Servidor backend
│   └── index.js               # Implementación del servidor
│
├── index.html                 # Archivo HTML principal
├── package.json               # Configuración del proyecto
└── README.md                  # Documentación del proyecto
```

## Características

- Panel de conexiones (plugboard) interactivo
- Rotores configurables con posiciones ajustables
- Cifrado/descifrado en tiempo real
- Comunicación mediante WebSockets
- Diseño responsivo

## Comenzando

1. Instala las dependencias:
   ```bash
   npm install
   ```

2. Inicia el servidor de desarrollo:
   ```bash
   npm run dev
   ```

3. Abre tu navegador y ve a `http://localhost:3000`

## Tecnologías Utilizadas

- HTML5, CSS3, JavaScript (ES6+)
- Node.js con Express
- Socket.IO para comunicación en tiempo real
- WebSockets
import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { Server } from "socket.io";
import { createServer } from "node:http";
import { createClient } from "@libsql/client";

import { fileURLToPath } from 'url';
import { dirname, join } from 'path';


//---------------- CONFIG VARIABLES ----------------//
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

dotenv.config();

const app = express();
const server = createServer(app);
const port = process.env.PORT || 3000;
const io = new Server(server,{
  connectionStateRecovery: {
    maxDisconnectionDuration: 2 * 60 * 1000,
  }
});

//---------------- DATABASE ----------------//
const db = createClient({
  url: process.env.DATABASE_URL,
  authToken: process.env.DATABASE_AUTH_TOKEN,
});

await db.execute(`
  CREATE TABLE IF NOT EXISTS messages (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    content TEXT,
    USUARIO TEXT,
    timestamp DATETIME DEFAULT CURRENT_TIMESTAMP
  )
`);

//---------------- MIDDLEWARES ----------------//

app.use(cors());
app.use(express.json());

// Rutas estaticas
app.use(express.static(join(__dirname, '../')));
app.use(express.static(join(__dirname, '../estilos')));
app.use(express.static(join(__dirname, '../scripts')));


//---------------- SOCKETS ----------------//
io.on('connection', async (socket) => {
  console.log('a user has connected!');
  const USUARIO = socket.handshake.auth.USUARIO ?? "Anonymous";

  socket.on('disconnect', () => {
    console.log('user disconnected');
  });

  socket.on('chat message', async (MENSAJE) => {
    let result;
    const timestamp = new Date().toISOString();
    try {
      result = await db.execute({
        sql: 'INSERT INTO messages (content, USUARIO, timestamp) VALUES (:content, :USUARIO, :timestamp)',
        args: { content: MENSAJE, USUARIO, timestamp },
      });
    } catch (error) {
      console.error(error);
      return;
    }

    console.log(MENSAJE);
    io.emit('chat message', { 
      MENSAJE, 
      serverOffset: result.lastInsertRowid.toString(), 
      USUARIO,
      timestamp,
    });
  });


  if (!socket.recovered) {
    try {
      const results = await db.execute({
        sql: 'SELECT * FROM messages WHERE id > (:id) ORDER BY id ASC',
        args: [socket.handshake.auth.serverOffset ?? 0],
      });

      results.rows.forEach((row) => {
        socket.emit('chat message', { 
          MENSAJE: row.content, 
          serverOffset: row.id, 
          USUARIO: row.USUARIO,
          timestamp: row.timestamp,
        });
      });
    } catch (error) {
      console.error(error);
    }
  }
});


//---------------- ROUTES ----------------//
app.get('/', (req, res) => {
  res.sendFile(process.cwd() + '/index.html');
});

// Obtener todos los mensajes
app.get('messages', async (req, res) => {
  try {
    const results = await db.execute({
      sql: 'SELECT * FROM messages',
    });
    res.json(results.rows);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error al obtener los mensajes' });
  }
});

// Enviar un nuevo mensaje
app.post('messages', async (req, res) => {
  try {
    const { content, USUARIO } = req.body;
    const result = await db.execute({
      sql: 'INSERT INTO messages (content, USUARIO) VALUES (:content, :USUARIO)',
      args: { content, USUARIO },
    });
    io.emit('chat message', content, result.lastInsertRowid.toString(), USUARIO);
    res.json({ id: result.lastInsertRowid.toString() });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error al enviar el mensaje' });
  }
});

//---------------- SERVER ----------------//
server.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
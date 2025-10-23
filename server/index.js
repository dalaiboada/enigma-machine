import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { Server } from "socket.io";
import { createServer } from "node:http";
import { createClient } from "@libsql/client";

dotenv.config();

const app = express();
const server = createServer(app);
const io = new Server(server,{
  connectionStateRecovery: {
    maxDisconnectionDuration: 2 * 60 * 1000,
  }
});

const db = createClient({
  url: process.env.DATABASE_URL,
  authToken: process.env.DATABASE_AUTH_TOKEN,
});

await db.execute(`
  CREATE TABLE IF NOT EXISTS messages (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    content TEXT ,
    username TEXT
  )
`);

app.use(cors());
app.use(express.json());

// Logica de conexion del socket
io.on('connection', async (socket) => {
  console.log('a user has connected!');
  const username = socket.handshake.auth.username ?? "Anonymous";

  socket.on('disconnect', () => {
    console.log('user disconnected');
  });

  socket.on('chat message', async (msg) => {
    let result;
    try {
      result = await db.execute({
        sql: 'INSERT INTO messages (content, username) VALUES (:content, :username)',
        args: { content: msg, username },
      });
    } catch (error) {
      console.error(error);
      return;
    }

    io.emit('chat message', msg, result.lastInsertRowid.toString(), username);
  });


  if (!socket.recovered) {
    try {
      const results = await db.execute({
        sql: 'SELECT * FROM messages WHERE id > (:id)',
        args: [socket.handshake.auth.serverOffset ?? 0],
      });

      results.rows.forEach((row) => {
        socket.emit('chat message', row.content, row.id, row.username);
      });
    } catch (error) {
      console.error(error);
    }
  }
});

const port = process.env.PORT || 3000;

app.get('/', (req, res) => {
  res.sendFile(process.cwd() + '/index.html');
});

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

app.post('messages', async (req, res) => {
  try {
    const { content, username } = req.body;
    const result = await db.execute({
      sql: 'INSERT INTO messages (content, username) VALUES (:content, :username)',
      args: { content, username },
    });
    io.emit('chat message', content, result.lastInsertRowid.toString(), username);
    res.json({ id: result.lastInsertRowid.toString() });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error al enviar el mensaje' });
  }
});

server.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
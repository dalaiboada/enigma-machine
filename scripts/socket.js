import { io } from '/node_modules/socket.io-client/dist/socket.io.esm.min.js';

const getUsername = async () => {
	let username = localStorage.getItem('username');
	if (!username || username === 'null') {
		username = prompt('Please enter your username');
		localStorage.setItem('username', username);
	}
	return username;
}

const username = await getUsername();
const socket = io({
  auth: {
    username,
    serverOffset: 0,
  }
});

socket.on('connect', () => {
	console.log('connected');
});

const enviarBtn = document.getElementById('enviar-btn');
enviarBtn.addEventListener('click', () => {
	console.log('enviando');
	const msg = document.getElementById('texto-cifrado').value;
	console.log(msg);
	socket.emit('chat message', msg);
	document.getElementById('texto-plano').innerText = '';
	document.getElementById('texto-cifrado').value = '';
});

socket.on('chat message', async ({ msg, serverOffset, username }) => {
	console.log(msg, serverOffset, username);
	const buzon = document.getElementById('buzon');
	const li = document.createElement('li');
	li.innerText = msg;
	buzon.prepend(li);
	buzon.scrollTop = 0;
});

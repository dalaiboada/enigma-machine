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

const createMessageElement = (msg, username, timestamp) => {
	const li = document.createElement('li');
	const text = document.createElement('span');
	const div = document.createElement('div');
	const time = document.createElement('small');
	const user = document.createElement('small');

	text.innerText = msg;
	time.innerText = timestamp;
	user.innerText = username;

	li.appendChild(text);
	li.appendChild(div);
	div.appendChild(time);
	div.appendChild(user);

	return li;
}

socket.on('chat message', async ({ msg, serverOffset, username, timestamp }) => {
	console.log(msg, serverOffset, username, timestamp);
	const buzon = document.getElementById('buzon');
	const li = createMessageElement(msg, username, timestamp);
	buzon.prepend(li);
	buzon.scrollTop = 0;
});

import { io } from '/node_modules/socket.io-client/dist/socket.io.esm.min.js';

const getUsername = async () => {
	let USUARIO = localStorage.getItem('USUARIO');
	if (!USUARIO || USUARIO === 'null') {
		USUARIO = prompt('Please enter your USUARIO');
		localStorage.setItem('USUARIO', USUARIO);
	}
	return USUARIO;
}

const USUARIO = await getUsername();
const socket = io({
  auth: {
    USUARIO,
    serverOffset: 0,
  }
});

socket.on('connect', () => {
	console.log('connected');
});

const enviarBtn = document.getElementById('enviar-btn');
enviarBtn.addEventListener('click', () => {
	console.log('enviando');
	const MENSAJE = document.getElementById('texto-cifrado').value;
	console.log(MENSAJE);
	socket.emit('chat message', MENSAJE);
	document.getElementById('texto-plano').innerText = '';
	document.getElementById('texto-cifrado').value = '';
});

const createMessageElement = (MENSAJE, USUARIO, timestamp) => {
	const li = document.createElement('li');
	const text = document.createElement('span');
	const div = document.createElement('div');
	const time = document.createElement('small');
	const user = document.createElement('small');

	text.innerText = MENSAJE;
	time.innerText = timestamp;
	user.innerText = USUARIO;

	li.appendChild(text);
	li.appendChild(div);
	div.appendChild(time);
	div.appendChild(user);

	return li;
}

socket.on('chat message', async ({ MENSAJE, serverOffset, USUARIO, timestamp }) => {
	console.log(MENSAJE, serverOffset, USUARIO, timestamp);
	const buzon = document.getElementById('buzon');
	const li = createMessageElement(MENSAJE, USUARIO, timestamp);
	buzon.prepend(li);
	buzon.scrollTop = 0;
});

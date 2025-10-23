import { io } from 'socket.io-client';

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

socket.on('chat message', async ({ msg, serverOffset, username }) => {
	console.log(msg, serverOffset, username);
});

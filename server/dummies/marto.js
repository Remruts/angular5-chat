// import io from 'socket.io-client';

var io = require('socket.io-client')
const socket = io('http://localhost:1337');
var miUser = {}

var users = {}
var groups = []

socket.emit('login',{"nick":"Marto.",'age':3,'city':"Tatooine"},(user) => miUser = user )


socket.on('updateChatLists', (data) => {
	console.log('updateChatLists')
	users = data.users
	groups = data.groups
	if (Object.keys(users).length > 1) {
		socket.emit('sendMessage',{
		'senderid':miUser.id,
		'receiverid': '2',
		'content':'NO TE OCNFUNDAS ANDYYY andy andy andy andyyyY!',
		'type': 'text'
		})
	}
})

socket.on('receiveMessage', (data) => {
	console.log('receiveMessage')
	console.log(data)
})




socket.emit('createGroup','Los Pimpollos')


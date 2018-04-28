// import io from 'socket.io-client';

var io = require('socket.io-client')
const socket = io('http://localhost:1337');
var miUser = {}


socket.emit('login',{"nick":"xX::XM4R70::Xx",'age':209,'city':"england"},(user) => miUser = user )


socket.on('updateChatLists', (data) => {
	console.log(data.users)
})

socket.on('receiveMessage', (data) => {
	console.log(data)
})


socket.emit('sendMessage',{
	'senderid':miUser.id,
	'receiverid': '0',
	'content':'Andy yo te elijo!',
	'type': 'pokemon-command.pcf'
})


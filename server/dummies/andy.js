// import io from 'socket.io-client';

var io = require('socket.io-client')
const socket = io('http://localhost:1337');
var miUser = {}

var users = {}
var groups = []

socket.emit('login',{"nick":"TheAndynator",'age':6,'city':"palet town"},(user) => miUser = user )


socket.on('updateChatLists', (data) => {
	console.log('updateChatLists')
	users = data.users
	groups = data.groups
})

socket.on('receiveMessage', (data) => {
	console.log('receiveMessage')
	console.log(data)
})


msg = {	'senderid': '100',
		'senderNick': 'TheAndynator',
		'receiverid': '0',
		'content':'andy andy andy andyyyY!',
		'type': 'text'
	}

socket.emit('sendMessage',msg)

msg2 = {	'senderid': '100',
			'senderNick': 'TheAndynator',
		'receiverid': '0',
		'content':'nro2',
		'type': 'text'
	}
socket.emit('sendMessage',msg2)
msg3 = {	'senderid': '100',
			'senderNick': 'TheAndynator',
		'receiverid': '0',
		'content':'pirulines',
		'type': 'text'
	}
socket.emit('sendMessage',msg3)

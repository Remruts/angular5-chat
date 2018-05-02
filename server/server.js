var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);

var nextID = 0
var users = {}
var chatGlobal = {'id':'0','name':"Andy's psycho boogaloo + 4"}
var groups = [chatGlobal]
var userxsocket = {}

io.on('connection',function(socket){

	console.log("new connection, socket id: " + socket.id)

	socket.on('login',(newUserData,callback) => {

		if (!userxsocket[socket.id]){
			newUserid = newID()

			newUser = {
				"id":newUserid,
				"nick":newUserData.nick,
				"age":newUserData.age,
				"city":newUserData.city
			}
			callback(newUser)

			users[newUserid] = newUser

			socket.join('0') //unir al chat global

			socket.join(newUserid) // hack re piola para no guardar tabla de ruteo

			updateChatLists();

			userxsocket[socket.id] = newUserid

			console.log('Login: ')
			console.log(newUser)
		} else {
			console.log(socket.id + ' ya conectado');
		}
	})

	socket.on('sendMessage',(aMessage) => {
		io.to(aMessage.receiverid).emit('receiveMessage',aMessage)
		console.log('message sent')
		console.log(aMessage)
	})


	socket.on('createGroup', (newGroupName, callback) => {
		newGroup = {
			'name':newGroupName,
			'id':newID()
		}
		socket.join(newGroup.id)
		groups.push(newGroup)

		callback(newGroup);

		updateChatLists();

		console.log("new group created")
		console.log(newGroup)
	})


	socket.on('joinGroup', (groupid) => {
		socket.join(groupid)
		console.log("someone joined a group, id: " + groupid)
	})

	socket.on('disconnect', () => {
		if (userxsocket[socket.id]){
			userid = userxsocket[socket.id]
			console.log( users[userid].nick +' (id: ' + userid + ') disconnected')
			delete userxsocket[socket.id]
			delete users[userid]

			updateChatLists();
		} else {
			console.log('socket disconnected, id: ' + socket.id)
		}
	})


})


function newID(){
	nextID += 1
	return nextID.toString()
}

http.listen(1337, function(){
  console.log('listening on *:1337');
});

function updateChatLists(){
	let userlist = [];
	for (var key in users){
		userlist.push(users[key]);
	}

	io.sockets.emit('updateChatLists',{"users":userlist,"groups":groups} )
}

// Lista de cambios al modelo:
// 	TODO

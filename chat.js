//Introducir socket.io y el puerto
const io = require('socket.io')(3000)

//coger/almacenar los usuarios
const users = {}

//al entrar en la web, llamará esta función
io.on('connection', socket => {
  //almacenar los usuarios. Cuando el cliente emita el evento 'new-user', se captura en esta función
  socket.on('new-user', name => {
    users[socket.id] = name
    socket.broadcast.emit('user-connected', name)
  })
  
  //envia el mensaje a cada persona que este conectada excepto la persona que envio el mensaje
  socket.on('send-chat-message', message => {
    socket.broadcast.emit('chat-message', { message: message, name: users[socket.id] })
  })

  //enviar/mostrar mensaje de desconnexion
  socket.on('disconnect', () => {
    socket.broadcast.emit('user-disconnected', users[socket.id])
    //borra el elemento usuario que se desconecta de usuarios conectados
    delete users[socket.id]
  })
})
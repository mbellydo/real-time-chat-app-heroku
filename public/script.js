//server hosting socket.js application
const socket = io('http://localhost:3000')
const messageContainer = document.getElementById('message-container')

//obtener formulario
const messageForm = document.getElementById('send-container')

//obtener mensaje introducido
const messageInput = document.getElementById('message-input')

//para almacenar/saber quien envia los mensajes
const name = prompt('What is your name?')

//aviso de connexion para el cliente
appendMessage('You joined')
socket.emit('new-user', name)

//mostrar el nombre al principio, antes del mensaje
socket.on('chat-message', data => {
  appendMessage(`${data.name}: ${data.message}`)
})

//avisar/mostrar que el usuario se conecta
socket.on('user-connected', name => {
  appendMessage(`${name} connected`)
})

//muestra que usuario se ha desconectado
socket.on('user-disconnected', name => {
  appendMessage(`${name} disconnected`)
})

//almacenar nuestros mensajes enviados para no perderlos
messageForm.addEventListener('submit', e => {
  e.preventDefault()
  const message = messageInput.value
  //Mostrar que tu has enviado tu mensaje
  appendMessage(`You: ${message}`)
  //envia el mensaje del cliente al server
  socket.emit('send-chat-message', message)
  //vaciar campo input despues de enviar mensaje
  messageInput.value = ''
})

//mostrar/meter los mensajes dentro de la sección para mostrarlos al cliente también
function appendMessage(message) {
  const messageElement = document.createElement('div')
  messageElement.innerText = message
  messageContainer.append(messageElement)
}
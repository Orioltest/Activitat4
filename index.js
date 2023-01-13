const app = require('express')();
const http = require('http').Server(app);
const io = require('socket.io')(http);
const port = 7085;

app.get('/', (req, res) => {
res.sendFile(__dirname + '/index.html');
});

io.on('connection', (socket) => {
console.log('a user connected');

socket.id = setInterval(() => {
const randomNum = Math.floor(Math.random() * 100);
socket.emit('chat message', randomNum);
}, 1000);

socket.on('disconnect', () => {
console.log('user disconnected');
clearInterval(socket.id)
});
});

http.listen(port, () => {
console.log(`Socket.IO server running at ${port}`);
});
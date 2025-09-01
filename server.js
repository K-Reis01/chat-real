const express = require('express');
const http = require('http');
const { Server } = require('socket.io');

const app = express();
const server = http.createServer(app);
const io = new Server(server);

const PORT = process.env.PORT || 3000;

app.use(express.static('public'));

io.on('connection', (socket) => {
    console.log('Um usuário entrou');

    socket.on('chat message', (msg) => {
        // msg já é { nickname, message }
        io.emit('chat message', msg);
    });

    socket.on('disconnect', () => {
        console.log('Usuário saiu');
    });
});

server.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
});

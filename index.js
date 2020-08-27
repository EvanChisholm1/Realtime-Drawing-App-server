const express = require('express');
const app = express();
const http = require('http').createServer(app);
const io = require('socket.io')(http);

const users = ['user a', 'user b']

io.on('connection', socket => {
    console.log('connected')
    socket.emit('current users', users);
    socket.on('stroke', ({ lastPos, currentPos }) => {
        // console.log(lastPos, currentPos)
        socket.broadcast.emit('stroke', { lastPos, currentPos });
    })
})

http.listen(4000, () => {
    console.log('listening on port 4000')
});
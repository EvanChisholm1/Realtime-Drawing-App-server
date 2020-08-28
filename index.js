const express = require('express');
const app = express();
const http = require('http').createServer(app);
const io = require('socket.io')(http);
require('dotenv').config();

const users = ['user a', 'user b']

app.get('/', (req, res) => res.send('it works'))

io.on('connection', socket => {
    console.log('connected')
    socket.emit('current users', users);
    socket.on('stroke', ({ lastPos, currentPos, roomId }) => {
        socket.to(roomId).emit('stroke', { lastPos, currentPos });
    })
    socket.on('change id', id => {
        console.log(id)
        socket.join(id);
    })
})

http.listen(process.env.PORT || 4000, () => {
    console.log('listening on port 4000')
});
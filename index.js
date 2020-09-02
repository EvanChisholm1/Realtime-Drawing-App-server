const express = require('express');
const app = express();
const http = require('http').createServer(app);
const io = require('socket.io')(http);
require('dotenv').config();

const users = ['user a', 'user b'];

// just a test route to see if the server is running
app.get('/', (req, res) => res.send('it works'));

// run this on connection to the websocket
io.on('connection', socket => {
    console.log('connected');
    socket.emit('current users', users);
    // when oneperson draws send the information to everyone else using the same whiteboard
    socket.on('stroke', ({ lastPos, currentPos, roomId }) => {
        socket.to(roomId).emit('stroke', { lastPos, currentPos });
    });
    // when the person wants to connect to a different room switch their socket to that room
    socket.on('change id', id => {
        console.log(id);
        socket.join(id);
        socket.to(id).emit('new user');
    });
});

// listen on port 4000 or whatever you put in your env
http.listen(process.env.PORT || 4000, () => {
    console.log('listening on port 4000');
});

const express = require("express");
const { ExpressPeerServer } = require("peer");
const { v4: uuidv4 } = require("uuid");
const app = express();
const server = require('http').Server(app);
const cors = require('cors');
const peerServer = ExpressPeerServer(server, {
    debug: true,
});
const io = require('socket.io')(server);

app.use(cors());
app.use('/peerjs', peerServer)
app.use(express.static('public'));
app.set('view engine', 'ejs')
app.get('/', (req, res) => res.redirect(`/${uuidv4()}/`));
app.get('/:room', function(req, res) {
  res.render('room', { roomId: req.params['room'] });
});

app.get('/*/style.css', function(req, res) {
  res.sendFile(__dirname + "/public/style.css");
});

app.get('/*/script.js', function(req, res) {
  res.sendFile(__dirname + "/public/script.js");
});

io.on('connection', (socket) => {
  console.log('connection')
  socket.on('join-room', (roomId, userId) => {
  socket.join(roomId);
  socket.to(roomId).emit('user-connected', userId);
  });
});
server.listen(4000);

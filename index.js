const express = require("express");
const { ExpressPeerServer } = require("peer");
const { v4: uuidv4 } = require("uuid");
const app = express();
const server = require('http').Server(app);
const io = require('socket.io')(server, {
  cors: {
    origin: '*'
  }
});

app.use('/peerjs', ExpressPeerServer(server, {
  debug: true,
}));
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
  setTimeout(()=>{
    socket.to(roomId).emit("user-connected", userId);
    //! socket.to(roomId).broadcast.emit("user-connected", userId);
  }, 1000);
  socket.on("message", (message) => {
    io.to(roomId).emit("createMessage", message, userName);
  });
  });
});
server.listen(4000);

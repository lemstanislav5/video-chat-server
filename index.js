const express = require("express");
const { ExpressPeerServer } = require("peer");
const { v4: uuidv4 } = require("uuid");
const app = express();
const server = require('http').Server(app);
// const peerServer = ExpressPeerServer(server, {
//     debug: true,
// });
const io = require('socket.io')(server);

// app.use(express.static('public'));
app.get('/', (req, res) => res.redirect(`/${uuidv4()}/`));
app.get('/:room', function(req, res) {
  res.send("room: " + req.params['room'])
  // console.log(req.params)
  // res.status(200).send("writeFileSync data.json");
  // let json = JSON.stringify(req);
  // fs.writeFileSync("data.json", json);
  // res.sendFile(__dirname + '/public/index.html', {
  //   headers: {
  //     'Content-Security-Policy': [
  //       'default-src \'self\'',
  //       'style-src \'unsafe-inline\' \'self\'',
  //       'script-src \'self\' https://www.google.com/recaptcha/ https://www.gstatic.com/recaptcha/',
  //       'frame-src \'self\' https://www.google.com/recaptcha/',
  //     ].join('; ')
  //   },
  // });
});

server.listen(4000);

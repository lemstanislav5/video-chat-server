const express = require("express");
const { v4: uuidv4 } = require("uuid");
const app = express();
const server = require('http').Server(app);

// app.use(express.static('public'));
app.get('/', (req, res) => res.redirect(`/${uuidv4()}/`));
let roomPath = '/room/:room([0-9a-f-]{36})';
app.get('/:room', function(req, res) {
  console.log(req, res)
  res.sendFile(__dirname + '/public/index.html', {
    headers: {
      'Content-Security-Policy': [
        'default-src \'self\'',
        'style-src \'unsafe-inline\' \'self\'',
        'script-src \'self\' https://www.google.com/recaptcha/ https://www.gstatic.com/recaptcha/',
        'frame-src \'self\' https://www.google.com/recaptcha/',
      ].join('; ')
    },
  });
});

server.listen(3000);

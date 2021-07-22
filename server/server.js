var port = 3000;
// var fs = require('fs');
var http = require('http');
var express = require('express');
var app = express();
/*
var options = {
    key: fs.readFileSync('/etc/letsencrypt/live/devpeter.net/privkey.pem'),
    cert: fs.readFileSync('/etc/letsencrypt/live/devpeter.net/fullchain.pem')
};
*/
var server = http.createServer(app);
var io = require('socket.io')(server);
var position = new Array(0, 0);
var velocity = new Array(0, 0);
var acceleration = new Array(0, 0);
const friction = 0.9;
const boost = 8;
// io.origins('https://www.differentServerDomain.fr:* https://www.differentServerDomain.fr/wp-admin/index.php:*');
// start of server

server.listen(port, function(){
  console.log('listening on *: '+ port + "\n");
});

io.on("connection", socket => {
  // or with emit() and custom event names
  socket.emit("greetings", "Hey!", { "ms": "jane" }, Buffer.from([4, 3, 3, 1]));

  // handle the event sent with socket.send()
  socket.on("message", (data) => {
    console.log(data);
  });

  socket.on("left", socket => {
    velocity[0] -= boost;
  })
  
  socket.on("right", socket => {
    velocity[0] += boost;
  });
  
  socket.on("up", socket => {
    velocity[1] -= boost;
  })
  
  socket.on("down", socket => {
    velocity[1] += boost;
  })

  // handle the event sent with socket.emit()
  socket.on("salutations", (elem1, elem2, elem3) => {
    console.log(elem1, elem2, elem3);
  });
});

setInterval(() => {
  io.emit('position', position);
  position[0] += velocity[0];
  position[1] += velocity[1];
  velocity[0] *= friction;
  velocity[1] *= friction;
  position[0] = Math.round(position[0]);
  position[1] = Math.round(position[1]);
}, 10);
// requirements express and socket.io

const express = require("express");
const app = express();
const http = require("http");
const server = http.createServer(app);
const { Server } = require("socket.io");
const io = new Server(server);

// show index.html in browser
app.get("/", (req, res) => {
  res.sendFile(__dirname + "/index.html");
});

// listen for events
// listen for chat message and emit to all users
io.on('connection', (socket) => {
  socket.on('chat message', (msg) => {
    io.emit('chat message', msg);
  });
});

// broadcast is for all users apart from the emitter
// io.on('connection', (socket) => {
//   socket.broadcast.emit('hi');
// });

// set up server to listen
server.listen(3000, () => {
  console.log("listening on port 3000");
});

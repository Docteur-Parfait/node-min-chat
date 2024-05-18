const express = require("express");
const app = express();
const http = require("http");
const server = http.createServer(app);
const { Server } = require("socket.io");
const io = new Server(server);

// if (localStorage.getItem('message') == null) {
//     var message = [];
// } else {
//     var message = localStorage.getItem('message')
// }
var message = [];

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/index.html");
});

app.get("/broad/:message", function (req, res) {
  io.emit("chat message", req.params.message);
});

app.get("/json", (req, res) => {
  res.status(200).json({ balance: balance });
});

io.on("connection", (socket) => {
  console.log("a user connected");

  socket.on("chat message", (msg) => {
    message.push(msg);
    console.log(socket.id);
    io.emit("chat message", msg);
  });

  socket.on("disconnect", () => {
    console.log("user disconnected");
  });
});

server.listen(3000, () => {
  console.log("listening on *:3000");
});

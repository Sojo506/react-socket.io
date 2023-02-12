const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
const { Server } = require("socket.io");
const http = require("http");
require("dotenv").config();

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: "http://127.0.0.1:5173",
  },
});

app.use(cors());
app.use(morgan("dev"));

io.on("connection", (socket) => {
  socket.on("message", (payload) => {
    socket.broadcast.emit("message", { body: payload, from: socket.id });
    console.log("🚀 ~ file: index.js:22 ~ socket.on ~ payload", {
      body: payload,
      from: socket.id,
    });
  });
});

server.listen(process.env.PORT, () => {
  console.log("Server listening on " + process.env.PORT);
});

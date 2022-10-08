const express = require("express");
const app = express();
const http = require("http").createServer(app);
const io = require("socket.io")(http);
const morgan = require("morgan");
const moment = require("moment");

const PORT = 4000;

app.set(morgan(`dev`));
app.use(express.static(__dirname + "/public"));

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/views/login.html");
});

app.get("/main", (req, res) => {
  res.sendFile(__dirname + "/views/main.html");
});

let time = null;
let date = null;

io.on("connection", (socket) => {
  socket.on("chat", (msg) => {
    io.emit("dateMsg", {
      date: moment().format("YYYY년 MM월 DD일"),
      isDateMsg: date !== moment().format("YYYY-MM-DD"),
    });

    io.emit("chat", {
      time: moment().format("HH:mm:ss"),
      msg,
      isAvatar: time != moment().format("HH:mm:ss").substr(0, 5),
    });
    time = moment().format("HH:mm:ss").substr(0, 5);
    date = moment().format("YYYY-MM-DD");
  });
});

http.listen(PORT, () => {
  console.log(`${PORT} server start`);
});

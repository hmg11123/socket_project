const app = require("express")();
const http = require("http").createServer(app);
const io = require("socket.io")(http);

const PORT = 4000;

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/views/login.html");
});

app.get("/main", (req, res) => {
  res.sendFile(__dirname + "/views/main.html");
});

io.on("connection", (socket) => {
  socket.on("chat", (msg) => {
    io.emit("chat", msg)
  });
});

http.listen(PORT, () => {
  console.log(`${PORT} server start`);
});

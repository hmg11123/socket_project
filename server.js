const app = require("express")();
const http = require("http").createServer(app);
const io = require("socket.io")(http);

const PORT = 4000;

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/main.html");
});

http.listen(PORT, () => {
  console.log(`${PORT} server start`);
});

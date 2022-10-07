const app = require("express")();
const http = require("http").createServer(app);
const io = require("socket.io")(http);

const PORT = 4000;

http.listen(PORT, () => {
  console.log(`${PORT} server start`);
});

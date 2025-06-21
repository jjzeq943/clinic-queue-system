const express = require("express");
const app = express();
const http = require("http").createServer(app);
const io = require("socket.io")(http);

app.use(express.static("."));
app.use(express.json());

let data = {
  clinic: "____診",
  doctor: "王大明",
  currentNumber: 0,
  queueList: []
};

app.get("/data", (req, res) => {
  res.json(data);
});

app.post("/update", (req, res) => {
  data = { ...data, ...req.body };
  io.emit("update", data);
  res.sendStatus(200);
});

io.on("connection", (socket) => {
  socket.emit("update", data);
});

const PORT = process.env.PORT || 3000;
http.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
const express = require("express");

const app = express();
const port = process.env.PORT || 3001;

app.get("/*", function (req, res) {
  res.send("<h1>Hello from the chatapp</h1>");
});

const server = app.listen(port, () => [
  console.log(`Server is listening on port: ${port}`),
]);

// will run the init method we created
const io = require("./config/socket").init(server);

io.on("connection", (socket) => {
  console.log(`Socket: ', ${socket.id} connection was made`);
  socket.on("join_room", (data) => {
    socket.join(data);
    console.log(`User with ID: ${socket.id} joined room: ${data}`);
  });

  socket.on("send_message", (data) => {
    socket.to(data.room).emit("receive_message", data);
  });

  socket.emit("welcome", "Welcome to my first socketIO app");
  socket.broadcast.emit("join", `${socket.id} has joined the server`);
  //   socket.on("post", (data) => {
  //     socket.broadcast.emit("newPost", data);
  //   });
  socket.on("disconnect", () => {
    console.log("User Disconnected", socket.id);
  });
});

// react-toastify

// create groups
// build object that says = this user sent this object
// set username so when you hit send it will show who sent the message

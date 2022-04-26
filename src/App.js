import "./App.css";
import { Typography, TextField, Button } from "@mui/material";
import react, { useState, useEffect, useRef } from "react";
// opens up some connection to our server
import openSocket from "socket.io-client";
import ChatRoom from "./components/ChatRoom/ChatRoom";
import React from "react";

// pass in the url that is going to connect to our server
const socket = openSocket("http://localhost:3001");

function App() {
  // useState is empty so the message is empty as default
  // const [message, setMessage] = useState("");
  // const [chat, setChat] = useState("");
  const [username, setUsername] = useState("");
  const [room, setRoom] = useState("");
  const usernameEl = useRef(null);
  const roomEl = useRef(null);

  // // this will change the state of message in our application
  // const handleChange = (e) => {
  //   setMessage(e.target.value);
  // };

  // const handleSubmit = (e) => {
  //   e.preventDefault();
  //   setChat([...chat, message]);
  //   setMessage("");
  //   socket.emit("post", message);
  //   setMessage("");
  // };

  // socket.on("welcome", (msg) => {
  //   console.log(msg);
  // });

  // socket.on("join", (msg) => {
  //   console.log(msg);
  // });

  // socket.on("newPost", (msg) => {
  //   // setchat to our exisiting chat (...chat) and our added message
  //   setChat([...chat, msg]);
  // });

  const joinRoom = () => {
    // set username here
    // const currentUsername = document.getElementById("outlined-basic");
    setUsername(usernameEl.current.value);

    // const currentRoom = document.getElementById("outlined-basic2");
    setRoom(roomEl.current.value);

    if (username !== "" && room !== "") {
      socket.emit("join_room", room);
    }
  };

  return (
    <div className="App">
      <Typography variant="h2">Chat App</Typography>
      <div>
        <Typography>Join a room: </Typography>
        <TextField
          id="outlined-basic"
          variant="outlined"
          type="text"
          placeholder="Username"
          inputRef={usernameEl}
          // onChange={(e) => {
          //   setUsername(e.target.value);
          // }}
          size="small"
          style={{
            backgroundColor: "white",
          }}
        />
        <TextField
          id="outlined-basic2"
          variant="outlined"
          type="text"
          placeholder="Room name"
          // onChange={(e) => {
          //   setRoom(e.target.value);
          // }}
          inputRef={roomEl}
          size="small"
          style={{
            backgroundColor: "white",
          }}
        />
        <Button variant="contained" color="success" onClick={joinRoom}>
          Click to join
        </Button>
      </div>
      <br />
      <ChatRoom socket={socket} username={username} room={room} />
    </div>
  );
}

export default App;

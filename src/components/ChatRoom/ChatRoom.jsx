import "../../App.css";
import {
  Grid,
  Typography,
  List,
  ListItem,
  ListItemText,
  TextField,
  Fab,
  Divider,
} from "@mui/material";
import { RiSendPlane2Line } from "react-icons/ri";
import React, { useState, useEffect } from "react";

import openSocket from "socket.io-client";
const socket = openSocket("http://localhost:3001");

export default function ChatRoom({ socket, username, room }) {
  const [chat, setChat] = useState("");
  const [message, setMessage] = useState("");
  const [messageList, setMessageList] = useState([""]);

  const timestamp = Date.now();
  // this will change the state of message in our application
  const setCurrentMessage = (e) => {
    setMessage(e.target.value);
  };

  const handleSendMessage = async (e) => {
    // e.preventDefault();
    // if the message is not empty, create this object (contains room info, user, message, time) - will send this to the socket server
    if (message !== "") {
      const messageData = {
        room: room,
        user: username,
        message: message,
        time: new Date().toLocaleString(),
      };
      await socket.emit("send_message", messageData);
      setMessageList((chat) => [...chat, messageData]);
      setMessage("");
    }
    // setChat([...chat, message]);
    // setMessage("");
    // socket.emit("post", message);
    // setMessage("");
  };

  socket.on("welcome", (msg) => {
    console.log(msg);
  });

  socket.on("join", (msg) => {
    console.log(msg);
  });

  socket.on("newPost", (msg) => {
    // setchat to our exisiting chat (...chat) and our added message
    setChat([...chat, msg]);
  });

  //   listens if there are any changes to our socket (whenever it receives another message)
  useEffect(() => {
    socket.on("receive_message", (data) => {
      setMessageList((chat) => [...chat, data]);
    });
  }, [socket]);

  return (
    <div>
      <div className="chatbox">
        <Grid container>
          <Grid item xs={12}>
            <Typography variant="h7" className="header-message">
              <p>Room Name: {room}</p>
              <p>Participant(s): {username}</p>
            </Typography>
          </Grid>
        </Grid>
        <Divider />
        {/* if message list (display is empty) show nothing */}
        <Grid item xs={9}>
          <List>
            <ListItem key="1">
              <Grid container>
                <Grid item xs={12}>
                  {messageList.map((messageContent) => {
                    if (messageContent === "") return;
                    else {
                      return (
                        <ListItemText>
                          <p className="user">
                            {messageContent.user} @ {messageContent.time}
                          </p>

                          <div className="message-content">
                            <p> {messageContent.message}</p>
                          </div>
                        </ListItemText>
                      );
                    }
                  })}
                </Grid>
              </Grid>
            </ListItem>
          </List>
        </Grid>
      </div>
      <Grid container style={{ padding: "20px" }}>
        <Grid item xs={11}>
          <TextField
            size="small"
            id="outlined-basic-email"
            label="Enter your message: "
            type="text"
            name="message"
            value={message}
            onChange={setCurrentMessage}
            onKeyPress={(e) => {
              e.key === "Enter" && handleSendMessage();
            }}
            fullWidth
            style={{
              backgroundColor: "white",
            }}
          />
        </Grid>
        <form onSubmit={handleSendMessage}>
          <Grid xs={1} align="right">
            <Fab
              size="small"
              color="primary"
              aria-label="add"
              type="submit"
              value="Send"
            >
              <RiSendPlane2Line />
            </Fab>
          </Grid>
        </form>
      </Grid>
    </div>
  );
}

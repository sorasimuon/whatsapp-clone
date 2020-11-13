import React, { useState } from "react";
import "./Chat.css";
import { makeStyles } from "@material-ui/core";
import IconButton from "@material-ui/core/IconButton";
import DonutLargeIcon from "@material-ui/icons/DonutLarge";
import AddIcon from "@material-ui/icons/Add";
import MoreVert from "@material-ui/icons/MoreVert";
import Avatar from "@material-ui/core/Avatar";
import { deepOrange } from "@material-ui/core/colors";
import InputBase from "@material-ui/core/InputBase";
import SearchIcon from "@material-ui/icons/Search";
import MoreHorizIcon from "@material-ui/icons/MoreHoriz";
import Typingbar from "./Typingbar";
import Message from "./Message";
import { v4 as uuidv4 } from "uuid";

const useStyles = makeStyles((theme) => ({
  avatar: {
    color: theme.palette.getContrastText(deepOrange[500]),
    backgroundColor: deepOrange[500],
    height: "40px",
    width: "40px",
    marginRight: 20,
  },
}));

function Chat({ messages }) {
  const classes = useStyles();
  const [username, setuserName] = useState("Sorasi");
  return (
    <div className="chat">
      {/* Chat Bar */}
      <div className="chatbar-navbar">
        <div className="chatbar-left">
          <Avatar
            className={classes.avatar}
            src="https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcSkcSGx-KlYubrDTQtCaFWZ3pBI3CJOxWwUHw&usqp=CAU"
          >
            S
          </Avatar>
          <div className="chatbar-title">
            <label className="chatbar-name">Sorasi</label>
            <label className="chatbar-status">Online</label>
          </div>
        </div>
        <div className="chatbar-right">
          <IconButton>
            <SearchIcon />
          </IconButton>
          <IconButton>
            <MoreHorizIcon />
          </IconButton>
        </div>
      </div>

      {/* Conversation area */}
      <div className="chat-body">
        {messages.map((message) => (
          <Message
            key={uuidv4()}
            messageName={message.name}
            messageContent={message.message}
            messageTimestamp={new Date(message.timestamp).toLocaleTimeString()}
            messageReceiver={username === message.name ? true : false}
          />
        ))}
      </div>
      <Typingbar />
    </div>
  );
}

export default Chat;

import React, { useState } from "react";
import { useStateValue } from "./context/stateProvider";
import axios from "./axios";
import isEmpty from "is-empty";

import "./Chat.css";
import { makeStyles } from "@material-ui/core";
import IconButton from "@material-ui/core/IconButton";
import Avatar from "@material-ui/core/Avatar";
import { deepOrange } from "@material-ui/core/colors";
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
  const [{ user, currentConversation }, dispatch] = useStateValue();

  // find the information of the interlocutor
  const getChatterInfo = async () => {
    if (isEmpty(currentConversation)) {
      console.log("marche pas");
      console.log(user);
      return {
        firstname: "",
        lastname: "",
        email: "",
      };
    } else {
      let chatterEmail = null;
      for (let email of currentConversation.chatters) {
        if (email !== user.email) {
          chatterEmail = email;
        }
      }
      // get chatterEmail' information
      await axios
        .get("/users/user", { params: { email: chatterEmail } })
        .then((response) => {
          return response.data;
        })
        .catch((err) => {
          console.log("did not find data regarding the interlocutor in DB");
          console.log(err.response.data);
        });
    }
  };

  const chatterInfo = getChatterInfo();

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
            <label className="chatbar-name">
              {chatterInfo.firstname} {chatterInfo.lastname}
            </label>
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
        {messages.map((message) => {
          // const currentDate = new Date(message.timestamp);

          // // determine the date to display in bubble representing the date
          // displayDate(currentDate);

          // Recall the previous date message in order to
          return (
            <div key={uuidv4()}>
              {/* <div className="date">
                <span>{messageToDisplay}</span>
              </div> */}
              <Message
                key={uuidv4()}
                messageName={message.firstname}
                messageContent={message.message}
                messageTimestamp={new Date(
                  message.timestamp
                ).toLocaleTimeString()}
                messageReceiver={user.email === message.email ? true : false}
              />
            </div>
          );
        })}
      </div>
      <Typingbar />
    </div>
  );
}

export default Chat;

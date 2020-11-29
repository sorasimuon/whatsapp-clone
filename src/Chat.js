import React, { useState, useEffect, useLayoutEffect } from "react";
import { useStateValue } from "./context/stateProvider";
import axios from "./axios";
import isEmpty from "is-empty";
import { useHistory } from "react-router-dom";

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
    backgroundColor: deepOrange[300],
    height: "40px",
    width: "40px",
    marginRight: 20,
  },
}));

function Chat() {
  const classes = useStyles();
  const [
    { user, currentConversation, contacts, conversations },
    dispatch,
  ] = useStateValue();
  const history = useHistory();

  const getCurrentInterlocutorInfo = () => {
    let email = "";
    // get the interlocurotr address from conversation
    let conversation = null;
    try {
      if (isEmpty(currentConversation) && !isEmpty(conversations)) {
        conversation = conversations[0];
      } else if (!isEmpty(currentConversation)) {
        conversation = currentConversation;
      } else {
        history.replace("/whatsapp-clone/login");
      }

      for (let chatterEmail of conversation.chatters) {
        if (chatterEmail !== user.email) {
          email = chatterEmail;
        }
      }

      // get interlocutor firstname and lastname from contacts
      let interlocutor = {};
      for (let contact of contacts) {
        if (contact.email === email) {
          interlocutor.firstname = contact.firstname;
          interlocutor.lastname = contact.lastname;
          interlocutor.email = contact.email;
        }
      }

      return interlocutor;
    } catch {
      history.replace("/whatsapp-clone/login");
    }
  };

  const [firstname, setFirstname] = useState(
    getCurrentInterlocutorInfo()?.firstname
  );
  const [lastname, setLastname] = useState(
    getCurrentInterlocutorInfo()?.lastname
  );
  const [email, setEmail] = useState(getCurrentInterlocutorInfo()?.email);

  // find the information of the interlocutor
  const getChatterInfo = async () => {
    if (isEmpty(currentConversation)) {
      console.log("marche pas ");
    } else {
      setFirstname(getCurrentInterlocutorInfo().firstname);
      setLastname(getCurrentInterlocutorInfo().lastname);
      setEmail(getCurrentInterlocutorInfo().email);
    }
  };

  useEffect(() => {
    getChatterInfo();
  }, [currentConversation]);

  return (
    <div className="chat">
      {/* Chat Bar */}
      <div className="chatbar-navbar">
        <div className="chatbar-left">
          <Avatar
            className={classes.avatar}
            // src="https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcSkcSGx-KlYubrDTQtCaFWZ3pBI3CJOxWwUHw&usqp=CAU"
          >
            {firstname?.charAt(0)}
          </Avatar>
          <div className="chatbar-title">
            <label className="chatbar-name">
              {firstname} {lastname}
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
        {!isEmpty(currentConversation.messages)
          ? currentConversation.messages?.map((message) => (
              <div key={uuidv4()}>
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
            ))
          : ""}
      </div>
      <Typingbar />
    </div>
  );
}

export default Chat;

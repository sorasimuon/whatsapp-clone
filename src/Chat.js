import React, { useState, useEffect, useLayoutEffect, useRef } from "react";
import { useStateValue } from "./context/stateProvider";
import axios from "./axios";
import isEmpty from "is-empty";
import { useHistory } from "react-router-dom";
import moment from "moment";

import "./Chat.css";
import { makeStyles } from "@material-ui/core";
import IconButton from "@material-ui/core/IconButton";
import Avatar from "@material-ui/core/Avatar";
import { deepOrange } from "@material-ui/core/colors";
import SearchIcon from "@material-ui/icons/Search";
import MoreHorizIcon from "@material-ui/icons/MoreHoriz";
import ArrowBackIcon from "@material-ui/icons/ArrowBack";
import Typingbar from "./Typingbar";
import Message from "./Message";
import { v4 as uuidv4 } from "uuid";

const useStyles = makeStyles((theme) => ({
  avatar: {
    color: theme.palette.getContrastText(deepOrange[500]),
    backgroundColor: deepOrange[300],

    [theme.breakpoints.down(768)]: {
      marginRight: 10,
      height: 32,
      width: 32,
      fontSize: 20,
    },

    [theme.breakpoints.up(768)]: {
      marginRight: 20,
      height: 60,
      width: 60,
      fontSize: 36,
    },
  },
  displaySideBarButton: {
    [theme.breakpoints.down(768)]: {
      padding: 4,
    },
  },
  icon: {
    color: "white",
  },
}));

function Chat() {
  const classes = useStyles();
  const [
    { user, currentConversation, contacts, conversations },
    dispatch,
  ] = useStateValue();
  const history = useHistory();
  const chatBodyRef = useRef();

  // Keep track of window innerWidth
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  useEffect(() => {
    // Handler to call on window resize
    function handleResizeWidth() {
      // Set window widthto state
      setWindowWidth(window.innerWidth);
    }
    // Add event listener
    window.addEventListener("resize", handleResizeWidth);

    // Remove event listener on cleanup
    return () => window.removeEventListener("resize", handleResizeWidth);
  });

  const handleDisplaySideBar = (e) => {
    e.preventDefault();

    dispatch({
      type: "DISPLAY_SIDEBAR",
    });
  };

  const getCurrentInterlocutorInfo = () => {
    let secondChatterEmail = "";
    // get the interlocurotr address from conversation
    let conversation = null;
    try {
      if (isEmpty(currentConversation) && !isEmpty(conversations)) {
        conversation = conversations[0];
      } else if (!isEmpty(currentConversation)) {
        conversation = currentConversation;
      } else {
        return;
      }

      for (let email of conversation.chatters) {
        if (email !== user.email) {
          secondChatterEmail = email;
        }
      }

      // get interlocutor firstname and lastname from contacts
      let interlocutor = {};
      for (let contact of contacts) {
        if (contact.email === secondChatterEmail) {
          interlocutor.firstname = contact.firstname;
          interlocutor.lastname = contact.lastname;
          interlocutor.email = contact.email;
        }
      }

      return interlocutor;
    } catch (error) {
      // console.log(error);
      history.replace("/login");
    }
  };

  // Keep in state the second chatter information
  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");
  const [email, setEmail] = useState("");

  // find the information of the interlocutor
  const getChatterInfo = () => {
    if (isEmpty(currentConversation)) {
    } else {
      const interlocutor = getCurrentInterlocutorInfo();
      if (interlocutor) {
        setFirstname(interlocutor.firstname);
        setLastname(interlocutor.lastname);
        setEmail(interlocutor.email);
      }
    }
  };

  useEffect(() => {
    getChatterInfo();
    chatBodyRef.current.scrollTop = chatBodyRef.current.scrollHeight;
  }, []);

  useEffect(() => {
    const interlocutor = getCurrentInterlocutorInfo();
    if (isEmpty(interlocutor)) {
      return;
    }
    setFirstname(interlocutor.firstname);
    setLastname(interlocutor.lastname);
    chatBodyRef.current.scrollTop = chatBodyRef.current.scrollHeight;
  }, [currentConversation]);

  useEffect(() => {
    if (currentConversation) {
      chatBodyRef.current.scrollTop = chatBodyRef.current.scrollHeight;
    }
  }, [currentConversation.messages.length]);

  return (
    <div className="chat">
      {/* Chat Bar */}
      <div className="chatbar-navbar">
        {windowWidth < 768 && (
          <IconButton
            className={classes.displaySideBarButton}
            onClick={(e) => handleDisplaySideBar(e)}
          >
            <ArrowBackIcon className={classes.icon} />
          </IconButton>
        )}

        <Avatar
          className={classes.avatar}
          // src="https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcSkcSGx-KlYubrDTQtCaFWZ3pBI3CJOxWwUHw&usqp=CAU"
        >
          {firstname?.charAt(0).toUpperCase()}
        </Avatar>
        <div className="chatbar-title">
          <label className="chatbar-name">
            {firstname.toUpperCase()} {firstname?.charAt(0).toUpperCase()}.
          </label>
          {/* <label className="chatbar-status">Online</label> */}
        </div>
        {/* <div className="chatbar-right">
          <IconButton>
            <SearchIcon />
          </IconButton>
          <IconButton>
            <MoreHorizIcon />
          </IconButton>
        </div> */}
      </div>

      {/* Conversation area */}
      <div className="chat-body" ref={chatBodyRef}>
        {!isEmpty(currentConversation?.messages)
          ? currentConversation.messages?.map((message) => (
              <Message
                key={uuidv4()}
                messageName={message.firstname}
                messageContent={message.message}
                messageTimestamp={moment(message.timestamp).format("LT")}
                messageReceiver={user.email !== message.email ? true : false}
              />
            ))
          : ""}
      </div>
      <Typingbar />
    </div>
  );
}

export default Chat;

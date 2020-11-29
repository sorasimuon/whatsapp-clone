import React, { useState, useEffect } from "react";
import { useStateValue } from "./context/stateProvider";
import axios from "./axios";
import isEmpty from "is-empty";

import "./SidebarConversation.css";
import Avatar from "@material-ui/core/Avatar";
import GroupIcon from "@material-ui/icons/Group";
import { makeStyles } from "@material-ui/core";
import Divider from "@material-ui/core/Divider";
import { deepOrange } from "@material-ui/core/colors";

const useStyles = makeStyles((theme) => ({
  avatar: {
    height: "60px",
    width: "60px",
    backgroundColor: deepOrange[300],
  },
}));

const translateDate = (date) => {
  let now = new Date();
  const weekday = new Array(7);
  let result;
  weekday[0] = "Sunday";
  weekday[1] = "Monday";
  weekday[2] = "Tuesday";
  weekday[3] = "Wednesday";
  weekday[4] = "Thursday";
  weekday[5] = "Friday";
  weekday[6] = "Saturday";

  result = weekday[now.getDay()];
  return result;
};

function SidebarConversation({ conversation }) {
  const classes = useStyles();
  const date = translateDate(Date.now());
  const [
    { messages, user, currentConversation, conversations, contacts },
    dispatch,
  ] = useStateValue();

  const [mounted, setMounted] = useState(true);
  const [selected, setSelected] = useState(false);
  const [lastMessage, setLastMessage] = useState(
    conversation.messages[conversation.messages.length - 1]?.message
  );

  const getInterlocutorInfo = () => {
    let email = "";
    // get the interlocurotr address from conversation
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
  };
  const [firstname, setFirstname] = useState(getInterlocutorInfo().firstname);
  const [lastname, setLastname] = useState(getInterlocutorInfo().lastname);
  const [email, setEmail] = useState(getInterlocutorInfo().email);

  useEffect(() => {
    if (!isEmpty(conversation.messages)) {
      setLastMessage(
        conversation.messages[conversation.messages.length - 1].message
      );
    } else {
      setLastMessage("Hey ! I am using What's App Clone");
    }
  }, [conversation]);

  // Define the new currentConversation
  const changeCurrentConversation = (e) => {
    e.preventDefault();
    dispatch({
      type: "SET_CURRENT_CONVERSATION",
      currentConv: conversation,
    });
  };

  useEffect(() => {
    if (String(conversation.__id) === String(currentConversation.__id)) {
      setSelected(true);
    } else {
      setSelected(false);
    }
  }, [currentConversation]);

  return (
    <div
      className={`sidebarConversation`}
      onClick={(e) => changeCurrentConversation(e)}
    >
      <div className="sidebarConversation-avatar">
        <Avatar className={classes.avatar} width="40px" height="40px">
          {firstname?.charAt(0)}
        </Avatar>
      </div>
      <div className="sidebarConversation-content">
        <div className="sidebarConversation-title">
          <label className="sidebarConversation-name">
            {firstname} {lastname}
          </label>
          <label className="sidebarConversation-date">{date}</label>
        </div>
        <div className="sidebarConversation-conversation">
          <label className="sidebarConversation-conv">{lastMessage}</label>
        </div>
        <Divider light variant="fullWidth" />
      </div>
    </div>
  );
}

export default SidebarConversation;

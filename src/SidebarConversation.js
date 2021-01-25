import React, { useState, useEffect, Fragment } from "react";
import { useStateValue } from "./context/stateProvider";
import axios from "./axios";
import isEmpty from "is-empty";
import moment from "moment";

import styles from "./SidebarConversation.module.css";
import Avatar from "@material-ui/core/Avatar";
import GroupIcon from "@material-ui/icons/Group";
import { makeStyles } from "@material-ui/core";
import Divider from "@material-ui/core/Divider";
import { deepOrange } from "@material-ui/core/colors";

const useStyles = makeStyles((theme) => ({
  avatar: {
    gridRow: "1/3",
    gridColumn: "1/1",
    justifySelf: "center",
    alignSelf: "center",
    backgroundColor: deepOrange[300],
    [theme.breakpoints.down(768)]: {
      width: 48,
      height: 48,
    },
    [theme.breakpoints.up(768)]: {
      width: 60,
      height: 60,
    },
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
  const [lastMessageDate, setLastMessageDate] = useState(
    moment(
      conversation.messages[conversation.messages.length - 1]?.timestamp
    ).format("L")
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

  // Get the last message date to display
  const handleLastMessageDate = (date) => {
    if (moment(date).format("L") === moment().format("L")) {
      setLastMessageDate(moment(date).format("LT"));
    } else {
      setLastMessageDate(moment(date).format("L"));
    }
  };

  // define the last message and the last message date to display
  useEffect(() => {
    if (!isEmpty(conversation.messages)) {
      setLastMessage(
        conversation.messages[conversation.messages.length - 1].message
      );
      handleLastMessageDate(
        conversation.messages[conversation.messages.length - 1].timestamp
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
    dispatch({
      type: "DISPLAY_SIDEBAR",
    });
  };

  useEffect(() => {
    if (conversation._id === currentConversation._id) {
      setSelected(true);
    } else {
      // console.log("conv " + conversation._id + ": unselected");
      setSelected(false);
    }
  }, [currentConversation]);

  return (
    <Fragment>
      <div
        className={`${styles.sidebarConversation} ${
          selected ? styles.sidebarConversation__isCurrent : ""
        }`}
        onClick={(e) => changeCurrentConversation(e)}
      >
        <Avatar className={classes.avatar}>
          {firstname?.charAt(0).toUpperCase()}
        </Avatar>
        <div className={styles.sidebarConversation__name}>
          {firstname} {lastname}
        </div>
        <p className={styles.sidebarConversation__date}>{lastMessageDate}</p>
        <p className={styles.sidebarConversation__lastMessage}>{lastMessage}</p>
      </div>
      <Divider light variant="fullWidth" />
    </Fragment>
  );
}

export default SidebarConversation;

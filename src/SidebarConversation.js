import React, { useState, useEffect } from "react";
import { useStateValue } from "./context/stateProvider";
import axios from "./axios";

import "./SidebarConversation.css";
import Avatar from "@material-ui/core/Avatar";
import GroupIcon from "@material-ui/icons/Group";
import { makeStyles, rgbToHex } from "@material-ui/core";
import Divider from "@material-ui/core/Divider";

const useStyles = makeStyles((theme) => ({
  avatar: {
    height: "60px",
    width: "60px",
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
  const [{ messages, user, currentConversation }, dispatch] = useStateValue();
  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");
  const [email, setEmail] = useState("");

  // find the information of the interlocutor
  const getChatterInfo = async () => {
    if (!conversation) {
      console.log("marche pas");
    } else {
      let chatterEmail = null;
      for (let email of conversation.chatters) {
        if (email !== user.email) {
          chatterEmail = email;
        }
      }
      // console.log("chatterEmail >>> " + chatterEmail);
      // get chatterEmail' information
      await axios
        .get("/users/user", { params: { email: chatterEmail } })
        .then((response) => {
          // console.log("Works !!!");
          // console.log(response.data);
          setFirstname(response.data.firstname);
          setLastname(response.data.lastname);
          setEmail(response.data.email);
        })
        .catch((err) => {
          console.log("did not find data regarding the interlocutor in DB");
          console.log(err.response.data);
        });
    }
  };

  useEffect(() => {
    // console.log("currentConversation");
    // console.log(currentConversation);
    const chatterInfo = getChatterInfo();
  }, [currentConversation]);

  return (
    <div className="sidebarConversation">
      <div className="sidebarConversation-avatar">
        <Avatar className={classes.avatar} width="40px" height="40px">
          <GroupIcon />
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
          <label className="sidebarConversation-conv">Hello</label>
        </div>
        <Divider light variant="fullWidth" />
      </div>
    </div>
  );
}

export default SidebarConversation;

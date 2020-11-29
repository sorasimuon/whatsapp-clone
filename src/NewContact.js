import React from "react";
import axios from "./axios";
import { useStateValue } from "./context/stateProvider";

import styles from "./NewContact.module.css";
import { makeStyles } from "@material-ui/core";
import Avatar from "@material-ui/core/Avatar";
import Divider from "@material-ui/core/Divider";
import { deepOrange } from "@material-ui/core/colors";

const useStyles = makeStyles((theme) => ({
  avatar: {
    height: 40,
    width: 40,
    marginRight: 10,
    backgroundColor: deepOrange[600],
  },
}));

function NewContact({ contact }) {
  const classes = useStyles();
  const [{ user, currentConversation }, dispatch] = useStateValue();

  const createNewChat = async () => {
    // e.preventDefault();

    await axios
      .post("conversations/new-chat", { chatters: [user.email, contact.email] })
      .then((res) => {
        console.log(res);
        console.log(
          "Created new chat between" +
            res.data.chatters[0] +
            " and" +
            res.data.chatters[1] +
            " : activated => " +
            res.data.activated
        );
        dispatch({
          type: "SET_CURRENT_CONVERSATION",
          currentConv: res.data,
        });
        dispatch({
          type: "ADD_CONVERSATION",
          conversation: res.data,
        });
        dispatch({
          type: "SET_SIDEBAR_SECTION",
          sideSection: "conversations",
        });
      });
  };

  return (
    <div>
      <div className={styles.newContact} onClick={(e) => createNewChat()}>
        <Avatar
          className={classes.avatar}
          //   src="https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcSkcSGx-KlYubrDTQtCaFWZ3pBI3CJOxWwUHw&usqp=CAU"
        >
          {contact.firstname[0]}
        </Avatar>
        <label>
          {contact.firstname} {contact.lastname}
        </label>
      </div>
      <Divider light variant="fullWidth" />
    </div>
  );
}

export default NewContact;

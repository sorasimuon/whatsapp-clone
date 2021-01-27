import React, { Fragment } from "react";
import axios from "./axios";
import { useStateValue } from "./context/stateProvider";

import styles from "./NewContact.module.css";
import { makeStyles } from "@material-ui/core";
import Avatar from "@material-ui/core/Avatar";
import Divider from "@material-ui/core/Divider";
import { deepOrange } from "@material-ui/core/colors";

const useStyles = makeStyles((theme) => ({
  avatar: {
    backgroundColor: deepOrange[600],
    [theme.breakpoints.down(768)]: {
      width: 48,
      height: 48,
      marginRight: 10,
    },
    [theme.breakpoints.up(768)]: {
      width: 60,
      height: 60,
      fontSize: 32,
      marginRight: 20,
    },
  },
}));

function NewContact({ contact }) {
  const classes = useStyles();
  const [
    { user, currentConversation, conversations },
    dispatch,
  ] = useStateValue();

  const createNewChat = async () => {
    // e.preventDefault();

    await axios
      .post("conversations/new-chat", { chatters: [user.email, contact.email] })
      .then((res) => {
        // if the conversation already exists, do not add to the list of conversations in store
        let exists = false;
        for (let conversation of conversations) {
          if (conversation._id === res.data._id) {
            exists = true;
          }
        }
        if (!exists) {
          dispatch({
            type: "ADD_CONVERSATION",
            conversation: res.data,
          });
        }

        // Set the new conversation as the current conversatio nto display
        dispatch({
          type: "SET_CURRENT_CONVERSATION",
          currentConv: res.data,
        });

        //Go back to Conversation Section
        dispatch({
          type: "SET_SIDEBAR_SECTION",
          sideSection: "conversations",
        });
      });
  };

  return (
    <Fragment>
      <div className={styles.newContact} onClick={(e) => createNewChat()}>
        <Avatar className={classes.avatar}>
          {contact.firstname[0].toUpperCase()}
        </Avatar>
        <p className={styles.newContact__name}>
          {contact.firstname} {contact.lastname}
        </p>
      </div>
      <Divider light variant="fullWidth" />
    </Fragment>
  );
}

export default NewContact;

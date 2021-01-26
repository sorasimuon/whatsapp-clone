import React, { useEffect } from "react";
import { useStateValue } from "./context/stateProvider";
import isEmpty from "is-empty";
import Pusher from "pusher-js";
import axios from "./axios";
import { useHistory, useLocation } from "react-router-dom";

import styles from "./Loading.module.css";
import CircularProgress from "@material-ui/core/CircularProgress";
import { makeStyles } from "@material-ui/core";
import { teal } from "@material-ui/core/colors";

const useStyles = makeStyles((theme) => ({
  iconPosition: {
    justifySelf: "center",
    alignSelf: "center",
  },
  circularProgress: {
    color: "white",
    [theme.breakpoints.down(768)]: {
      width: 40,
      height: 40,
    },
    [theme.breakpoints.up(768)]: {
      width: 100,
      height: 100,
    },
  },
}));

function Loading() {
  //Declare constants
  const classes = useStyles();
  const [
    { user, currentConversation, conversations },
    dispatch,
  ] = useStateValue();
  const history = useHistory();
  const location = useLocation();

  const getChatterInfo = async (conversation) => {
    let chatterEmail = null;
    let interlocutor = {};

    for (let email of conversation.chatters) {
      if (email !== user.email) {
        chatterEmail = email;
      }
    }
    // get chatterEmail' information
    const response = await axios.get("/users/user", {
      params: { email: chatterEmail },
    });

    await setTimeout(() => {
      interlocutor.firstname = response.data.firstname;
      interlocutor.lastname = response.data.lastname;
      interlocutor.email = response.data.email;
      console.log("done");
    }, 250);

    return interlocutor;
  };

  useEffect(() => {
    // If a user is not logged in
    if (!user) {
      if (location.pathname !== "/whatsapp-clone/new-account") {
        history.replace("/whatsapp-clone/login");
      }
    } else {
      console.log("User = ");
      console.log(user);
      // 1. Synchronize with the list of contacts
      const syncContacts = async () => {
        await axios.get("/users/sync").then((response) => {
          const contacts_list = [];
          for (let contact of response.data) {
            if (contact.email !== user.email) {
              contacts_list.push(contact);
            }
          }
          dispatch({
            type: "SET_CONTACTS",
            contacts: contacts_list,
          });
          console.log("Done: Sync Contacts List");
          console.log(response.data);
        });
      };
      syncContacts();

      // 2. Synchronize with the list of conversation associated to the user
      const syncConversations = async () => {
        await axios.post("/conversations/sync", user).then((response) => {
          // If the user has already some conversations
          if (response.data) {
            if (!isEmpty(response.data)) {
              dispatch({
                type: "SET_CONVERSATIONS_LIST",
                convs: response.data,
              });
              // 4. Define the first conversation in the list as the currentConversation (wait 1.5 sec)
              if (isEmpty(currentConversation)) {
                dispatch({
                  type: "SET_CURRENT_CONVERSATION",
                  currentConv: response.data[0],
                });
              }
              console.log("Done: Sync ConversationsList");
              console.log(response.data);
            }
            // Ise the user does not have any open conversations
            // else {
            //   const dummyConv = {
            //     _id: "1",
            //     chatters: ["user", "user"],
            //     activated: false,
            //     messages: [],
            //   };
            //   dispatch({
            //     type: "SET_CURRENT_CONVERSATION",
            //     currentConv: dummyConv,
            //   });
            // }
          }
        });
      };
      syncConversations();
    }
  }, []);

  // Use Effect that subscribe to Pusher to get notified
  ///when a new message have been sent from a user
  useEffect(() => {
    // Pusher.logToConsole = true;

    const pusher = new Pusher("3678c5b88461dcff7cb9", { cluster: "eu" });

    const messageChannel = pusher.subscribe("messages");
    messageChannel.bind("updated", (data) => {
      console.log(data);
      dispatch({
        type: "ADD_NEW_MESSAGE",
        data: data,
      });

      // setMessages([...messages, data]);
    });

    // Return to clean up the subscription
    return () => {
      messageChannel.unbind_all();
      messageChannel.unsubscribe();
    };
  }, []);

  useEffect(() => {
    setTimeout(() => {
      history.replace("/whatsapp-clone/conversations");
    }, 3000);
    return () => {};
  }, []);

  return (
    <div className={classes.iconPosition}>
      <CircularProgress className={classes.circularProgress} />
    </div>
  );
}

export default Loading;

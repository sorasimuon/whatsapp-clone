import React, { useEffect, useState } from "react";
import { useStateValue } from "./context/stateProvider";
import isEmpty from "is-empty";

import "./App.css";
import Chat from "./Chat";
import Sidebar from "./Sidebar";
import Login from "./Login";
import Register from "./Register";
import Loading from "./Loading";
import "./App.css";
import Pusher from "pusher-js";
import axios from "./axios";

import { Route, Switch, useHistory, useLocation } from "react-router-dom";

function App() {
  //Declare constants
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
        });
      };
      syncContacts();

      // 2. Synchronize with the list of conversation associated to the user
      const syncConversations = async () => {
        await axios.post("/conversations/sync", user).then((response) => {
          if (response.data) {
            console.log("again");
            console.log(response.data);
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
          }
        });
      };
      syncConversations();
    }
  }, [user]);

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
  }, [conversations]);

  return (
    <div className="app">
      <Switch>
        <Route path="/whatsapp-clone/login">
          <Login />
        </Route>
        <Route path="/whatsapp-clone/new-account">
          <Register />
        </Route>
        <Route path="/whatsapp-clone/conversations">
          <div className="app-body">
            <Sidebar />
            <Chat />
          </div>
        </Route>
        <Route path="/whatsapp-clone/loading">
          <Loading />
        </Route>
        <Route path="/">
          <Login />
        </Route>
      </Switch>
    </div>
  );
}

export default App;

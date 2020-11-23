import React, { useEffect, useState } from "react";
import { useStateValue } from "./context/stateProvider";
import isEmpty from "is-empty";

import "./App.css";
import Chat from "./Chat";
import Sidebar from "./Sidebar";
import Login from "./Login";
import Register from "./Register";
import "./App.css";
import Pusher from "pusher-js";
import axios from "./axios";

import { Route, Switch, useHistory, useLocation } from "react-router-dom";

function App() {
  const [messages, setMessages] = useState([]);
  const [
    { user, currentConversation, conversations, contacts },
    dispatch,
  ] = useStateValue();
  const history = useHistory();
  const location = useLocation();

  useEffect(async () => {
    // If a user is not logged in
    if (!user) {
      if (location.pathname !== "/whatsapp-clone/new-account") {
        history.replace("/whatsapp-clone/login");
      }
    } else {
      // if a user is logged in
      // 1. Synchronize messages for all conversations
      await axios.get("/messages/sync").then((response) => {
        setMessages(response.data);
      });

      // 2. Syncrhonize with the list of contacts
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

      // 3. Synchronize with the list of conversation associated to the user
      await axios.post("/conversations/sync", user).then((response) => {
        if (response.data) {
          dispatch({
            type: "SET_CONVERSATIONS_LIST",
            convs: response.data,
          });
        }
      });

      // 4. Define the first conversation in the list as the currentConversation (wait 1.5 sec)
      if (isEmpty(currentConversation) && !isEmpty(conversations)) {
        dispatch({
          type: "SET_CURRENT_CONVERSATION",
          currentConv: { chatters: conversations[0].chatters },
        });
      }

      // 5. revert to conversations page (wait 1.5sec)
      setTimeout(() => {
        history.push("/whatsapp-clone/conversations");
      }, 1000);
    }
  }, [user]);

  useEffect(() => {
    // Pusher.logToConsole = true;

    const pusher = new Pusher("3678c5b88461dcff7cb9", { cluster: "eu" });

    const messageChannel = pusher.subscribe("messages");
    messageChannel.bind("inserted", (data) => {
      setMessages([...messages, data]);
      console.log(data);
    });
    // console.log("Messages : ", messages);

    // Return to clean up the subscription
    return () => {
      messageChannel.unbind_all();
      messageChannel.unsubscribe();
    };
  }, [messages]);

  // useEffect -> When the user select a new contact to dialog with,
  // it opens a new conversation window with this contact
  // react when currentConversation is changed

  useEffect(() => {}, [currentConversation]);

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
            <Chat messages={messages} />
          </div>
        </Route>
        <Route path="/">
          <Login />
        </Route>
      </Switch>
    </div>
  );
}

export default App;

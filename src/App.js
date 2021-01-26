import React, { useEffect, useState } from "react";

import "./App.css";
import Chat from "./Chat";
import Sidebar from "./Sidebar";
import Login from "./Login";
import Register from "./Register";
import Loading from "./Loading";
import MainWindow from "./MainWindow";
import "./App.css";
import Drawer from "@material-ui/core/Drawer";

import Pusher from "pusher-js";
import { useStateValue } from "./context/stateProvider";

import { Route, Switch, Redirect } from "react-router-dom";

function App() {
  const [
    { conversations, displaySideBar, user, currentConversation },
    dispatch,
  ] = useStateValue();
  console.log(currentConversation);

  // Use Effect that subscribe to Pusher to get notified
  //when a new message have been sent from a user
  useEffect(() => {
    // Pusher.logToConsole = true;

    const pusher = new Pusher("3678c5b88461dcff7cb9", { cluster: "eu" });

    const messageChannel = pusher.subscribe("messages");
    messageChannel.bind("updated", (data) => {
      // console.log("youhou");
      // console.log(data);
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

  //  keep track of the window innerwidth

  return (
    <div className="app">
      <Switch>
        <Route path="/whatsapp-clone/login">
          <Login />
        </Route>
        <Route path="/whatsapp-clone/new-account">
          <Register />
        </Route>
        <Route path="/whatsapp-clone/loading">
          <Loading />
        </Route>
        {user ? (
          <Route path="/whatsapp-clone/conversations">
            {/* <div className="app-body">
              <Drawer anchor="left" open={displaySideBar}>
                <Sidebar />
              </Drawer>
              <Chat />
            </div> */}
            <MainWindow />
          </Route>
        ) : (
          <Redirect to="/whatsapp-clone/login" />
        )}
        {/* <Route path="/whatsapp-clone/conversations">
          <div className="app-body">
            <Drawer anchor="left" open={displaySideBar}>
              <Sidebar />
            </Drawer>
            <Chat />
          </div>
        </Route> */}

        <Route path="/">
          <Login />
        </Route>
      </Switch>
    </div>
  );
}

export default App;

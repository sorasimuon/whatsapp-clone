import React, { useEffect, useState } from "react";
import "./App.css";
import Chat from "./Chat";
import Sidebar from "./Sidebar";
import "./App.css";
import Pusher from "pusher-js";
import axios from "./axios";

function App() {
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    axios.get("/messages/sync").then((response) => {
      // console.log("Messages from 1st get : ", response.data);
      setMessages(response.data);
    });
  }, []);

  useEffect(() => {
    // Pusher.logToConsole = true;

    const pusher = new Pusher("3678c5b88461dcff7cb9", { cluster: "eu" });

    const messageChannel = pusher.subscribe("messages");
    messageChannel.bind("inserted", (data) => {
      setMessages([...messages, data]);
      // console.log("New Message : ", data);
    });
    // console.log("Messages : ", messages);
    return () => {
      messageChannel.unbind_all();
      messageChannel.unsubscribe();
    };
  }, [messages]);

  return (
    <div className="app">
      <div className="app-body">
        <Sidebar />
        <Chat messages={messages} />
      </div>
    </div>
  );
}

export default App;

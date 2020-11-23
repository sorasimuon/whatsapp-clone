import React from "react";
import "./Message.css";

function Message({
  messageName,
  messageContent,
  messageTimestamp,
  messageReceiver = false,
}) {
  return (
    <div className={`message ${messageReceiver ? "message-receiver" : ""}`}>
      <span className="message-name">{messageName}</span>
      <span className="message-content">{messageContent}</span>
      <span className="message-timestamp">{messageTimestamp}</span>
    </div>
  );
}

export default Message;

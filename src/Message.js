import React from "react";
import "./Message.css";

function Message({
  messageName,
  messageContent,
  messageTimestamp,
  messageReceiver = false,
}) {
  return (
    <div className={messageReceiver ? "message-receiver" : "message"}>
      {/* <span className="message-name">{messageName}</span> */}
      <p className="message-content">{messageContent}</p>
      <p className="message-timestamp">{messageTimestamp}</p>
    </div>
  );
}

export default Message;

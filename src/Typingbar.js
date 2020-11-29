import React, { useState } from "react";
import { useStateValue } from "./context/stateProvider";
import "./Typingbar.css";

// Material-UI
import { makeStyles } from "@material-ui/core";
import IconButton from "@material-ui/core/IconButton";
import InsertEmoticonIcon from "@material-ui/icons/InsertEmoticon";
import AttachFileIcon from "@material-ui/icons/AttachFile";
import SendOutlinedIcon from "@material-ui/icons/SendOutlined";
import InputBase from "@material-ui/core/InputBase";
import { grey } from "@material-ui/core/colors";
import MicNoneIcon from "@material-ui/icons/MicNone";
import axios from "./axios";

const useStyles = makeStyles((theme) => ({
  iconButton: {
    fontSize: 30,
    fontWeight: 200,
    color: grey[600],
  },
  inputInput: {
    backgroundColor: "rgba(255,255,255,0.5)",
    borderRadius: "20px",
    color: "rgb(100,100,100)",
    width: "100%",
    height: 40,
  },
}));

function Typingbar() {
  const [{ user, currentConversation }, dispatch] = useStateValue();
  const [textMessage, settextMessage] = useState("");
  const classes = useStyles();

  const sendMessage = async (e) => {
    e.preventDefault();

    // Create Message object
    const newMessage = {
      message: textMessage,
      firstname: user.firstname,
      email: user.email,
    };

    // erase the typing bar
    settextMessage("");

    const req = await axios
      .post("/messages/new-message", {
        newMessage: newMessage,
        currentConversation: currentConversation,
      })
      .then((res) => {
        console.log(
          `Sent new message from ${res.data.firstname} at ${new Date(
            res.data.timestamp
          ).toLocaleTimeString()} >> ${res.data.message}`
        );
      });
  };
  return (
    <div className="typingbar">
      <IconButton>
        <InsertEmoticonIcon className={classes.iconButton} />
      </IconButton>
      <IconButton>
        <AttachFileIcon className={classes.iconButton} />
      </IconButton>

      <div className="typing-search">
        <form onSubmit={(e) => sendMessage(e)}>
          <InputBase
            placeholder="Type text"
            className={classes.inputInput}
            inputProps={{ "aria-label": "search" }}
            onChange={(e) => settextMessage(e.target.value)}
            value={textMessage}
          />
        </form>
      </div>

      <IconButton>
        {textMessage ? (
          <SendOutlinedIcon className={classes.iconButton} />
        ) : (
          <MicNoneIcon className={classes.iconButton} />
        )}
      </IconButton>
    </div>
  );
}

export default Typingbar;

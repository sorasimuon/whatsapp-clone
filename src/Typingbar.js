import React, { useState, useRef, useEffect } from "react";
import { useStateValue } from "./context/stateProvider";
import "./Typingbar.css";
import isEmpty from "is-empty";

// Material-UI
import { makeStyles } from "@material-ui/core";
import IconButton from "@material-ui/core/IconButton";
import InsertEmoticonIcon from "@material-ui/icons/InsertEmoticon";
import AttachFileIcon from "@material-ui/icons/AttachFile";
import SendOutlinedIcon from "@material-ui/icons/SendOutlined";
import TextField from "@material-ui/core/TextField";
import InputBase from "@material-ui/core/InputBase";
import { grey } from "@material-ui/core/colors";
import MicNoneIcon from "@material-ui/icons/MicNone";
import axios from "./axios";

const useStyles = makeStyles((theme) => ({
  iconButton: {
    fontSize: 30,
    fontWeight: 200,
    color: grey[600],
    alignSelf: "end",
    paddingRight: 0,
  },
  inputInput: {
    backgroundColor: "rgba(255,255,255,0.5)",

    color: "rgb(100,100,100)",
    width: "100%",
    [theme.breakpoints.down(767.98)]: {
      padding: 10,
      fontSize: "1em",
      borderRadius: 20,
    },
    [theme.breakpoints.up(768)]: {
      padding: 16,
      fontSize: "1.4em",
      borderRadius: 24,
    },
  },
}));

function Typingbar() {
  const [{ user, currentConversation }, dispatch] = useStateValue();
  const [textMessage, setTextMessage] = useState("");
  const classes = useStyles();
  const typingBarRef = useRef();
  const sendButtonRef = useRef();

  const sendMessage = async (e) => {
    e.preventDefault();

    if (isEmpty(textMessage)) {
      return;
    }

    // Create Message object
    const newMessage = {
      message: textMessage,
      firstname: user.firstname,
      email: user.email,
    };

    // erase the typing bar
    setTextMessage("");

    const req = await axios
      .post("/messages/new-message", {
        newMessage: newMessage,
        currentConversation: currentConversation,
      })
      .then((res) => {})
      .catch((error) => {
        console.log(error);
      });
  };

  // Apply eventListener to Enter key press
  const submitOnEnter = (event) => {
    if (event.key === "Enter" && !event.shiftKey) {
      sendButtonRef.current.click();
      event.preventDefault(); // Prevents the addition of a new line in the text field (not needed in a lot of cases)
    }
  };
  useEffect(() => {
    typingBarRef.current.addEventListener("keypress", submitOnEnter);
    return () => {
      typingBarRef.current.removeEventListener("keypress", submitOnEnter);
    };
  }, []);
  const handleTextMessage = (value) => {
    setTextMessage(value);
  };

  return (
    <div className="typingbar">
      {/* <IconButton>
        <InsertEmoticonIcon className={classes.iconButton} />
      </IconButton>
      <IconButton>
        <AttachFileIcon className={classes.iconButton} />
      </IconButton> */}

      <div
        className="typing-search"
        // onSubmit={(e) => sendMessage(e)}
      >
        <form className="form">
          <InputBase
            multiline
            placeholder="Type text"
            className={classes.inputInput}
            inputProps={{ "aria-label": "search" }}
            onChange={(e) => handleTextMessage(e.target.value)}
            value={textMessage}
            ref={typingBarRef}
          />
        </form>
      </div>

      <IconButton
        ref={sendButtonRef}
        disabled={textMessage ? false : true}
        onClick={(e) => sendMessage(e)}
        className={classes.iconButton}
      >
        <SendOutlinedIcon className={classes.iconButton} />
      </IconButton>
    </div>
  );
}

export default Typingbar;

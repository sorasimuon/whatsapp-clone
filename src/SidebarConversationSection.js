// Section where is diaplayed the list of conversation engaged by the signed in user

import React, { useEffect, useState } from "react";
import { useStateValue } from "./context/stateProvider";
import { v4 as uuidv4 } from "uuid";

import "./SidebarConversationSection.module.css";
import styles from "./SidebarConversationSection.module.css";
import IconButton from "@material-ui/core/IconButton";
import DonutLargeIcon from "@material-ui/icons/DonutLarge";
import QuestionAnswerIcon from "@material-ui/icons/QuestionAnswer";
import MoreVert from "@material-ui/icons/MoreVert";
import Avatar from "@material-ui/core/Avatar";
import { makeStyles } from "@material-ui/core";
import { deepOrange, teal } from "@material-ui/core/colors";
import InputBase from "@material-ui/core/InputBase";
import SearchIcon from "@material-ui/icons/Search";
import SidebarConversation from "./SidebarConversation";

const useStyles = makeStyles((theme) => ({
  avatar: {
    backgroundColor: deepOrange[300],
    [theme.breakpoints.down(768)]: {
      width: 30,
      height: 30,
    },
    [theme.breakpoints.up(768)]: {
      width: 50,
      height: 50,
    },
  },
  inputInput: {
    backgroundColor: "rgba(255,255,255,0.5)",
    borderRadius: "20px",
    width: "80%",
    color: "rgb(150,150,150)",
  },
  searchIcon: {
    fontSize: 20,
  },
  addIcon: {
    color: "white",
    padding: 10,
    borderRadius: "50%",
    [theme.breakpoints.down(768)]: {
      width: 30,
      height: 30,
      backgroundColor: teal[300],
    },
    [theme.breakpoints.up(768)]: {
      width: 40,
      height: 40,
    },
  },
  margin: {
    margin: 5,
  },
  newConversationButton: {
    [theme.breakpoints.down(768)]: {
      position: "fixed",
      bottom: 5,
      right: 5,
    },
    [theme.breakpoints.up(768)]: {
      justifySelf: "flex-end",
      padding: 0,
    },
  },
}));

function SidebarConversationSection() {
  const classes = useStyles();
  const [{ user, contacts, conversations }, dispatch] = useStateValue();

  useEffect(() => {}, [conversations]);

  return (
    <div className={styles.sidebar__mainContent}>
      <div className={styles.sidebar__navbar}>
        <Avatar className={`${classes.avatar} ${classes.margin}`}>
          {user?.firstname.slice(0, 1).toUpperCase()}
        </Avatar>
        <p className={`${styles.sidebar__username} ${classes.margin}`}>
          {user?.firstname.toUpperCase()}
        </p>
        <IconButton
          className={classes.newConversationButton}
          onClick={(e) =>
            dispatch({
              type: "SET_SIDEBAR_SECTION",
              sideSection: "new-conversation",
            })
          }
        >
          <QuestionAnswerIcon fontSize="small" className={classes.addIcon} />
        </IconButton>
      </div>
      {/* <div className={styles.sidebar__searchbar}>
        <div className={styles.sidebar__search}>
          <div className={styles.sidebar__searchIcon}>
            <SearchIcon className={classes.searchIcon} />
          </div>
          <InputBase
            placeholder="Search or start a new chat"
            className={classes.inputInput}
            inputProps={{ "aria-label": "search" }}
          />
        </div>
      </div> */}

      <div className={styles.sidebar__listContainer}>
        {conversations.map((conversation) => (
          <SidebarConversation key={uuidv4()} conversation={conversation} />
        ))}
      </div>
    </div>
  );
}

export default SidebarConversationSection;

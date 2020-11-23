// Section where is diaplayed the list of conversation engaged by the signed in user

import React, { useEffect, useState } from "react";
import { useStateValue } from "./context/stateProvider";
import { v4 as uuidv4 } from "uuid";

import "./SidebarConversationSection.module.css";
import styles from "./SidebarConversationSection.module.css";
import IconButton from "@material-ui/core/IconButton";
import DonutLargeIcon from "@material-ui/icons/DonutLarge";
import AddIcon from "@material-ui/icons/Add";
import MoreVert from "@material-ui/icons/MoreVert";
import Avatar from "@material-ui/core/Avatar";
import { makeStyles } from "@material-ui/core";
import { deepOrange } from "@material-ui/core/colors";
import InputBase from "@material-ui/core/InputBase";
import SearchIcon from "@material-ui/icons/Search";
import SidebarConversation from "./SidebarConversation";

const useStyles = makeStyles((theme) => ({
  orange: {
    color: theme.palette.getContrastText(deepOrange[500]),
    backgroundColor: deepOrange[500],
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
    fontSize: 30,
  },
  margin: {
    margin: 5,
  },
}));

function SidebarConversationSection() {
  const classes = useStyles();
  const [{ user, contacts, conversations }, dispatch] = useStateValue();

  return (
    <div className={styles.sidebar__mainContent}>
      <div className={styles.sidebar__navbar}>
        <div className={styles.sidebar__left}>
          <Avatar
            className={`${classes.orange} ${classes.margin}`}
            src="https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcSkcSGx-KlYubrDTQtCaFWZ3pBI3CJOxWwUHw&usqp=CAU"
          >
            S
          </Avatar>
          <p className={`${styles.sidebar__username} ${classes.margin}`}>
            {user?.firstname}
          </p>
        </div>
        <div className={styles.sidebar__right}>
          <IconButton>
            <DonutLargeIcon />
          </IconButton>
          <IconButton
            onClick={(e) =>
              dispatch({
                type: "SET_SIDEBAR_SECTION",
                sideSection: "new-conversation",
              })
            }
          >
            <AddIcon className={classes.addIcon} />
          </IconButton>
          <IconButton>
            <MoreVert />
          </IconButton>
        </div>
      </div>
      <div className={styles.sidebar__searchbar}>
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
      </div>

      <div className={styles.sidebar__listContainer}>
        {conversations.map((conversation) => (
          <SidebarConversation key={uuidv4()} conversation={conversation} />
        ))}
      </div>
    </div>
  );
}

export default SidebarConversationSection;

import React from "react";
import { useStateValue } from "./context/stateProvider";
import NewContactList from "./NewContactList";

import styles from "./SidebarNewConversationSection.module.css";
import IconButton from "@material-ui/core/IconButton";
import ArrowBackIcon from "@material-ui/icons/ArrowBack";
import { makeStyles } from "@material-ui/core";
import InputBase from "@material-ui/core/InputBase";
import SearchIcon from "@material-ui/icons/Search";

const useStyles = makeStyles({
  backButton: {
    color: "white",
    fontSize: 35,
  },
  marginButton: {
    marginRight: 10,
  },
});

function SidebarNewConversationSection() {
  const classes = useStyles();
  const [{}, dispatch] = useStateValue();
  return (
    <div className={styles.sidebar__mainContent}>
      {/* Header */}
      <div className={styles.sidebar__navbar}>
        <IconButton
          className={classes.marginButton}
          onClick={(e) =>
            dispatch({
              type: "SET_SIDEBAR_SECTION",
              sideSection: "conversations",
            })
          }
        >
          <ArrowBackIcon className={classes.backButton} />
        </IconButton>
        <p className={styles.sidebar__title}>New Chat</p>
      </div>
      {/* Search Bar */}
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
        <NewContactList />
      </div>
    </div>
  );
}

export default SidebarNewConversationSection;

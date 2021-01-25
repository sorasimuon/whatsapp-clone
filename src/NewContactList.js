import React from "react";
import { useStateValue } from "./context/stateProvider";
import { v4 as uuidv4 } from "uuid";

import styles from "./NewContactList.module.css";
import { makeStyles, withTheme } from "@material-ui/core";
import Divider from "@material-ui/core/Divider";
import GroupAddIcon from "@material-ui/icons/GroupAdd";
import NewContact from "./NewContact";

const useStyles = makeStyles((theme) => ({
  newGroupButton: {
    borderRadius: "50%",
    backgroundColor: "#007868",
    color: "white",
    width: 30,
    height: 30,
    padding: 10,
    marginRight: 10,
  },
}));

function NewContactList() {
  const classes = useStyles();

  const [{ sideSection, contacts }, dispatch] = useStateValue();
  // console.log("CONTACTS LIST >> ");
  // console.log(contacts);

  return (
    <div className={styles.newContactList}>
      {/* <div
        className={styles.newContactList__item}
        onClick={(e) =>
          dispatch({ type: "SET_SIDEBAR_SECTION", sideSection: "new_group" })
        }
      >
        <GroupAddIcon className={classes.newGroupButton} />

        <label className={styles.newContactList__title}>NEW GROUP</label>
      </div>
      <Divider light variant="fullWidth" /> */}
      <div className={styles.newContactList__listContacts}>
        {/* <div className={`${styles.title}`}>
          <label className={styles.newContactList__title2}>
            FREQUENTLY CONTACTED
          </label>
        </div>
        <Divider light variant="fullWidth" /> */}
        {contacts.map((contact) => (
          <NewContact key={uuidv4()} contact={contact} />
        ))}
      </div>
    </div>
  );
}

export default NewContactList;

import React, { useState, useEffect } from "react";
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

  const [
    { sideSection, contacts, conversations, user },
    dispatch,
  ] = useStateValue();

  const getOnlyNoConversationsContactList = () => {
    let contactList = [];
    const result = [];
    for (let conversation of conversations) {
      contactList = contactList.concat(conversation.chatters);
    }
    console.log(contactList);

    for (let contact of contacts) {
      if (!contactList.includes(contact.email)) {
        result.push(contact);
      }
    }
    console.log(result);
    setListContacts(result);
  };

  const [listContacts, setListContacts] = useState([]);

  useEffect(() => {
    getOnlyNoConversationsContactList();
  }, []);

  return (
    <div className={styles.newContactList}>
      <div className={styles.newContactList__listContacts}>
        {listContacts?.map((contact) => (
          <NewContact key={uuidv4()} contact={contact} />
        ))}
      </div>
    </div>
  );
}

export default NewContactList;

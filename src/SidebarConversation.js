import React from "react";
import "./SidebarConversation.css";
import Avatar from "@material-ui/core/Avatar";
import GroupIcon from "@material-ui/icons/Group";
import { makeStyles, rgbToHex } from "@material-ui/core";
import Divider from "@material-ui/core/Divider";

const useStyles = makeStyles((theme) => ({
  avatar: {
    height: "60px",
    width: "60px",
  },
}));

const translateDate = (date) => {
  let now = new Date();
  const weekday = new Array(7);
  let result;
  weekday[0] = "Sunday";
  weekday[1] = "Monday";
  weekday[2] = "Tuesday";
  weekday[3] = "Wednesday";
  weekday[4] = "Thursday";
  weekday[5] = "Friday";
  weekday[6] = "Saturday";

  result = weekday[now.getDay()];
  return result;
};

function SidebarConversation() {
  const classes = useStyles();
  const date = translateDate(Date.now());
  return (
    <div className="sidebarConversation">
      <div className="sidebarConversation-avatar">
        <Avatar className={classes.avatar} width="40px" height="40px">
          <GroupIcon />
        </Avatar>
      </div>
      <div className="sidebarConversation-content">
        <div className="sidebarConversation-title">
          <label className="sidebarConversation-name">Sorasi</label>
          <label className="sidebarConversation-date">{date}</label>
        </div>
        <div className="sidebarConversation-conversation">
          <label className="sidebarConversation-conv">Sorasi</label>
        </div>
        <Divider light variant="fullWidth" />
      </div>
    </div>
  );
}

export default SidebarConversation;

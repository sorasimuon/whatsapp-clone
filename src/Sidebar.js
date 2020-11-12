import React from "react";
import "./Sidebar.css";
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
}));

function Sidebar() {
  const classes = useStyles();

  return (
    <div className="sidebar">
      <div className="sidebar-navbar">
        <div className="sidebar-left">
          <Avatar
            className={classes.orange}
            src="https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcSkcSGx-KlYubrDTQtCaFWZ3pBI3CJOxWwUHw&usqp=CAU"
          >
            S
          </Avatar>
        </div>
        <div className="sidebar-right">
          <IconButton>
            <DonutLargeIcon />
          </IconButton>
          <IconButton>
            <AddIcon className={classes.addIcon} />
          </IconButton>
          <IconButton>
            <MoreVert />
          </IconButton>
        </div>
      </div>
      <div className="sidebar-searchbar">
        <div className="sidebar-search">
          <div className="sidebar-searchIcon">
            <SearchIcon className={classes.searchIcon} />
          </div>
          <InputBase
            placeholder="Search or start a new chat"
            className={classes.inputInput}
            inputProps={{ "aria-label": "search" }}
          />
        </div>
      </div>

      <div className="sidebar-listContainer">
        <SidebarConversation />
        <SidebarConversation />
        <SidebarConversation />
        <SidebarConversation />
        <SidebarConversation />
        <SidebarConversation />
        <SidebarConversation />
        <SidebarConversation />
        <SidebarConversation />
        <SidebarConversation />
        <SidebarConversation />
        <SidebarConversation />
        <SidebarConversation />
        <SidebarConversation />
        <SidebarConversation />
      </div>
    </div>
  );
}

export default Sidebar;

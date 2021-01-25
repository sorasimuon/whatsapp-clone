import React, { useEffect, useState } from "react";
import { useStateValue } from "./context/stateProvider";
import SidebarConversationSection from "./SidebarConversationSection";
import SidebarNewConversationSection from "./SidebarNewConversationSection";
import { useHistory } from "react-router-dom";

import Drawer from "@material-ui/core/Drawer";

import "./Sidebar.css";

function Sidebar() {
  const history = useHistory();
  const [
    { user, conversations, sideSection, currentConversation },
    dispatch,
  ] = useStateValue();
  const [sectionName, setSectionName] = useState(sideSection);

  useEffect(() => {
    if (!user) {
      history.replace("/whatsapp-clone/login");
    }
    setSectionName(sideSection);
  }, [sideSection]);

  return (
    <div className="sidebar">
      <SidebarConversationSection />
      <Drawer
        anchor="left"
        open={sectionName === "new-conversation" ? true : false}
      >
        <SidebarNewConversationSection />
      </Drawer>
    </div>
  );
}

export default Sidebar;

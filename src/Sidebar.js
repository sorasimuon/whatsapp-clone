import React, { useEffect, useState } from "react";
import { useStateValue } from "./context/stateProvider";
import SidebarConversationSection from "./SidebarConversationSection";
import SidebarNewConversationSection from "./SidebarNewConversationSection";

import "./Sidebar.css";

function Sidebar() {
  const [{ user, conversations, sideSection }, dispatch] = useStateValue();

  // console.log("sideSection >>>", sideSection);

  return (
    <div className="sidebar">
      {sideSection === "conversations" ? <SidebarConversationSection /> : ""}
      {sideSection === "new-conversation" ? (
        <SidebarNewConversationSection />
      ) : (
        ""
      )}
    </div>
  );
}

export default Sidebar;

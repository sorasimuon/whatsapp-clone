import React, { useEffect, useState } from "react";
import { useStateValue } from "./context/stateProvider";
import SidebarConversationSection from "./SidebarConversationSection";
import SidebarNewConversationSection from "./SidebarNewConversationSection";

import "./Sidebar.css";

function Sidebar() {
  const [
    { user, conversations, sideSection, currentConversation },
    dispatch,
  ] = useStateValue();
  const [sectionName, setSectionName] = useState(sideSection);

  useEffect(() => {
    console.log("sideSection >>>", sideSection);
    setSectionName(sideSection);
  }, [sideSection]);

  return (
    <div className="sidebar">
      {sectionName === "conversations" ? <SidebarConversationSection /> : ""}
      {sectionName === "new-conversation" ? (
        <SidebarNewConversationSection />
      ) : (
        ""
      )}
    </div>
  );
}

export default Sidebar;

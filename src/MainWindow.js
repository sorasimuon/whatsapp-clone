import React, { useState, useEffect } from "react";
import isEmpty from "is-empty";

import Chat from "./Chat";
import Sidebar from "./Sidebar";
import { useStateValue } from "./context/stateProvider";

// Material UI + styling
import styles from "./MainWindow.module.css";
import Drawer from "@material-ui/core/Drawer";

/////////////////////////////

function MainWindow() {
  const [{ displaySideBar, currentConversation }, dispatch] = useStateValue();

  // Keep track of window innerWidth
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  useEffect(() => {
    // Handler to call on window resize
    function handleResizeWidth() {
      // Set window widthto state
      setWindowWidth(window.innerWidth);
    }
    // Add event listener
    window.addEventListener("resize", handleResizeWidth);

    // Remove event listener on cleanup
    return () => window.removeEventListener("resize", handleResizeWidth);
  });

  if (isEmpty(currentConversation)) {
    return <Sidebar />;
  }
  return (
    <div className={styles.app__body}>
      {windowWidth < 768 ? (
        <Drawer anchor="left" open={displaySideBar}>
          <Sidebar />
        </Drawer>
      ) : (
        <Sidebar />
      )}
      <Chat />
    </div>
  );
}

export default MainWindow;

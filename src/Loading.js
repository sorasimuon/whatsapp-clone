import React, { useEffect } from "react";
import { useHistory } from "react-router-dom";

import styles from "./Loading.module.css";
import CircularProgress from "@material-ui/core/CircularProgress";
import { makeStyles } from "@material-ui/core";
import { teal } from "@material-ui/core/colors";

function Loading() {
  const history = useHistory();

  useEffect(() => {
    setTimeout(() => {
      history.push("/whatsapp-clone/conversations");
    }, 3000);
    return () => {};
  }, []);

  return (
    <div>
      <CircularProgress />
    </div>
  );
}

export default Loading;

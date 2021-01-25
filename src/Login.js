import React, { useState, useEffect } from "react";
import { useStateValue } from "./context/stateProvider";
import axios from "./axios";
import { useHistory } from "react-router-dom";

// Material UI + styling
import styles from "./Login.module.css";
import { makeStyles } from "@material-ui/core";
import TextField from "@material-ui/core/TextField";
import IconButton from "@material-ui/core/IconButton";
import Button from "@material-ui/core/Button";
import WhatsAppIcon from "@material-ui/icons/WhatsApp";
import ErrorIcon from "@material-ui/icons/Error";
import CircularProgress from "@material-ui/core/CircularProgress";
import validateInput from "./utilities/validator";
import { v4 as uuidv4 } from "uuid";
import { teal } from "@material-ui/core/colors";

const useStyles = makeStyles((theme) => ({
  logo: {
    color: teal[500],
    justifySelf: "center",
    [theme.breakpoints.down(768)]: {
      width: 44,
      height: 44,
    },
    [theme.breakpoints.up(768)]: {
      width: 100,
      height: 100,
    },
  },
  login__signinButton: {
    backgroundColor: teal[500],
    color: "white",
    "&:hover": {
      backgroundColor: teal[300],
    },
  },
  login__newAccountButton: {
    color: "grey",
    backgroundColor: "inherit",
    boxShadow: "none",
    "&:hover": {
      color: teal[500],
      boxShadow: "none",
      backgroundColor: "inherit",
    },
  },
}));

const textFieldStyle = makeStyles((theme) => ({
  root: {
    padding: 5,
  },
}));

function Login() {
  const [{ user }, dispatch] = useStateValue();
  const classes = useStyles();
  const textFieldClass = textFieldStyle();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessages, setErrorMessages] = useState({});
  const history = useHistory();
  const [isLoading, setIsLoading] = useState(false);

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

  const setUser = (firstname, lastname, email) => {
    dispatch({
      type: "SET_USER",
      user: {
        firstname: firstname,
        lastname: lastname,
        email: email,
        userId: "random_value",
      },
    });
  };

  const signIn = async (e) => {
    e.preventDefault();

    // isLoading to True
    setIsLoading(true);

    // Reset the list of error messages
    setErrorMessages([]);

    //   Check validity of the input
    const { errors, isValid } = validateInput({ email, password }, "login");

    if (isValid) {
      const credentials = {
        email: email,
        password: password,
      };
      console.log(`Connection attempt from ${credentials.email} >>>`);
      const request = await axios
        .post("/users/login", credentials)
        .then((res) => {
          console.log("Login successful >> ", res.data.data.email);
          // save the user in the data layer/store
          setUser(
            res.data.data.firstname,
            res.data.data.lastname,
            res.data.data.email
          );
          history.push("/whatsapp-clone/loading");
        })
        .catch((error) => {
          console.log(error);
          if (error.response) {
            setErrorMessages({
              serverError: error.response.data.errors.incorrectPassword,
            });
          } else {
            setErrorMessages({
              serverError:
                "Connection failed: The service is temporarily unavailable. Please try again later",
            });
          }
          // reset Password and email
          setPassword("");
          setEmail("");
        });
    } else {
      console.log(">>> Error Sign In : check credentials");
      setErrorMessages(errors);
    }

    // isLoading to False
    setIsLoading(false);
  };
  return (
    <div className={styles.login}>
      <form className={styles.login__form}>
        <WhatsAppIcon
          className={`${classes.logo} ${styles.login__elementPosition}`}
        />

        <p className={styles.login__elementPosition}> Sign In </p>

        <p
          hidden={errorMessages?.serverError ? false : true}
          className={`${styles.login__elementPosition} ${styles.login__errorMessage}`}
        >
          <ErrorIcon />
          {errorMessages?.serverError}
        </p>

        <TextField
          error={errorMessages?.email ? true : false}
          helperText={errorMessages?.email}
          className={`${styles.login__elementPosition} `}
          // inputProps={{
          //   className: textFieldClass.root,
          // }}
          label="email"
          variant="outlined"
          value={email}
          type="email"
          onChange={(e) => setEmail(e.target.value)}
        />
        <TextField
          error={errorMessages?.password ? true : false}
          helperText={errorMessages?.password}
          className={styles.login__elementPosition}
          label="password"
          variant="outlined"
          value={password}
          type="password"
          onChange={(e) => setPassword(e.target.value)}
        />
        <Button
          disabled={isLoading}
          className={`${styles.login__elementPosition} ${classes.login__signinButton}`}
          variant="contained"
          type="submit"
          onClick={(e) => signIn(e)}
        >
          Sign In
          {isLoading && <CircularProgress style={{ color: "white" }} />}
        </Button>
        <p className={styles.login__elementPosition}> Or </p>
        <Button
          className={`${styles.login__elementPosition} ${classes.login__newAccountButton}`}
          href="/whatsapp-clone/new-account"
          variant="contained"
          type="submit"
        >
          Create new account
        </Button>
        <div className={styles.login__elementPosition}>
          <p>TEST :</p>
          <p>email: user1@email.com</p>
          <p>pwd: test1</p>
        </div>
      </form>
      <h1 className={styles.login__title}>What's app Clone</h1>
    </div>
  );
}

export default Login;

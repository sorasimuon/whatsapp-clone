import React, { useState } from "react";
import axios from "./axios";
import { Link, useHistory } from "react-router-dom";
import { useStateValue } from "./context/stateProvider";
import validateInput from "./utilities/validator";

// Material UI and Styling
import styles from "./Login.module.css";
import { makeStyles } from "@material-ui/core";
import TextField from "@material-ui/core/TextField";
import IconButton from "@material-ui/core/IconButton";
import ArrowBackIcon from "@material-ui/icons/ArrowBack";
import AlternateEmailIcon from "@material-ui/icons/AlternateEmail";
import Button from "@material-ui/core/Button";
import MoreHorizIcon from "@material-ui/icons/MoreHoriz";
import ErrorIcon from "@material-ui/icons/Error";
import { teal } from "@material-ui/core/colors";

const useStyles = makeStyles((theme) => ({
  logo: {
    width: 40,
    height: 40,
  },
  register__signupButton: {
    backgroundColor: teal[500],
    color: "white",
    "&:hover": {
      backgroundColor: teal[300],
    },
  },
}));

function Register() {
  const classes = useStyles();
  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [password2, setPassword2] = useState("");
  const [{ user }, dispatch] = useStateValue();
  const [errorMessages, setErrorMessages] = useState({});
  const errors = [];

  const history = useHistory();

  const signUp = async (e) => {
    e.preventDefault();

    // Reset the list of error messages
    setErrorMessages([]);

    //   Check validity of the input
    const { errors, isValid } = validateInput(
      { firstname, lastname, email, password, password2 },
      "register"
    );

    if (isValid) {
      // Create object to post to new registration
      const newUser = {
        firstname: firstname,
        lastname: lastname,
        email: email,
        password: password,
        password2: password2,
      };
      // Method post to push data to server side
      axios
        .post("/users/register", newUser)
        .then((response) => {
          // if new user succesfully connected, add the new user as the user in localStorage context API
          if (response) {
            // Push to local storage
            console.log("New user registered >>> ");
            console.log(response.data);
            dispatch({
              type: "SET_USER",
              user: {
                firstname: response.data.firstname,
                lastname: response.data.lastname,
                email: response.data.email,
                userId: "random_value",
              },
            });
            history.push("/whatsapp-clone/loading");
          }
        })
        .catch((error) => {
          console.log(error);
          if (error.response) {
            setErrorMessages({
              serverError: error.response.data.errors.knownUser,
            });
          } else {
            setErrorMessages({
              serverError:
                "Connection failed: The service is temporarily unavailable. Please try again later",
            });
          }
        });
    } else {
      console.log(">>> Error Sign Up : check credentials");
      setErrorMessages(errors);
    }
  };

  return (
    <div className={styles.login}>
      <form className={styles.login__form}>
        <Link to="/whatsapp-clone/login" className={classes.logoPositionLeft}>
          <IconButton>
            <ArrowBackIcon className={classes.logo2} />
          </IconButton>
        </Link>

        <p className={styles.login__elementPosition}> Sign Up </p>

        <p
          hidden={errorMessages?.serverError ? false : true}
          className={`${styles.login__elementPosition} ${styles.login__errorMessage}`}
        >
          <ErrorIcon />
          {errorMessages?.serverError}
        </p>

        <TextField
          error={errorMessages?.firstname ? true : false}
          helperText={errorMessages?.firstname}
          className={styles.login__elementPosition}
          label="First name"
          variant="outlined"
          value={firstname}
          onChange={(e) => setFirstname(e.target.value)}
        />
        <TextField
          error={errorMessages?.lastname ? true : false}
          helperText={errorMessages?.lastname}
          className={styles.login__elementPosition}
          label="Last name"
          variant="outlined"
          value={lastname}
          onChange={(e) => setLastname(e.target.value)}
        />
        <TextField
          error={errorMessages?.email ? true : false}
          helperText={errorMessages?.email}
          className={styles.login__elementPosition}
          label="Email"
          variant="outlined"
          value={email}
          type="email"
          onChange={(e) => setEmail(e.target.value)}
        />
        <TextField
          error={errorMessages?.password ? true : false}
          helperText={errorMessages?.password}
          className={styles.login__elementPosition}
          label="Password"
          variant="outlined"
          value={password}
          type="password"
          onChange={(e) => setPassword(e.target.value)}
        />
        <TextField
          error={errorMessages?.password2 ? true : false}
          helperText={errorMessages?.password2}
          className={styles.login__elementPosition}
          label="Confirm Password"
          variant="outlined"
          value={password2}
          type="password"
          onChange={(e) => setPassword2(e.target.value)}
        />
        <Button
          className={`${styles.login__elementPosition} ${classes.register__signupButton}`}
          variant="contained"
          type="submit"
          onClick={(e) => signUp(e)}
        >
          Sign Up
        </Button>
      </form>
      <h1 className={styles.login__title}>What's app Clone</h1>
    </div>
  );
}

export default Register;

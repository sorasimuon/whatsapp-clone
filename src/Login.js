import React, { useState } from "react";
import "./Login.css";
import { useStateValue } from "./context/stateProvider";
import axios from "./axios";
import { useHistory } from "react-router-dom";

import { makeStyles } from "@material-ui/core";
import TextField from "@material-ui/core/TextField";
import IconButton from "@material-ui/core/IconButton";
import Button from "@material-ui/core/Button";
import AlternateEmailIcon from "@material-ui/icons/AlternateEmail";
import validateInput from "./utilities/validator";
import { v4 as uuidv4 } from "uuid";

const useStyles = makeStyles((theme) => ({
  logo: {
    width: 40,
    height: 40,
  },
  textField: {
    width: "80%",
  },
  margin: {
    marginBottom: 20,
  },
  button: {
    width: "80%",
  },
}));

function Login() {
  const [{ user }, dispatch] = useStateValue();
  const classes = useStyles();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessages, setErrorMessages] = useState([]);
  const history = useHistory();

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
      console.log(credentials);
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
          console.log(error.response);
          setErrorMessages([error.response.data]);
          // reset Password and email
          setPassword("");
          setEmail("");
        });
    } else {
      console.log(">>> Error Sign In : check credentials");
      setErrorMessages(errors);
    }
  };

  return (
    <form>
      <div className="login">
        <IconButton>
          <AlternateEmailIcon className={classes.logo} />
        </IconButton>

        <p> Sign In </p>
        <ul>
          {errorMessages.map((errorMessage) => (
            <li key={uuidv4()} className="errorMessage">
              {errorMessage}
            </li>
          ))}
        </ul>
        <TextField
          className={`${classes.textField} ${classes.margin}`}
          label="email"
          variant="outlined"
          value={email}
          type="email"
          onChange={(e) => setEmail(e.target.value)}
        />
        <TextField
          className={`${classes.textField} ${classes.margin}`}
          label="password"
          variant="outlined"
          value={password}
          type="password"
          onChange={(e) => setPassword(e.target.value)}
        />
        <Button
          className={`${classes.button} ${classes.margin}`}
          color="primary"
          variant="contained"
          type="submit"
          onClick={(e) => signIn(e)}
        >
          Sign In
        </Button>
        <p className={classes.margin}> Or </p>
        <Button
          className={`${classes.button} ${classes.margin}`}
          href="/whatsapp-clone/new-account"
          variant="contained"
          type="submit"
        >
          Create new account
        </Button>
      </div>
    </form>
  );
}

export default Login;

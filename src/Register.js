import React, { useState } from "react";
import axios from "./axios";
import { Link, useHistory } from "react-router-dom";
import { useStateValue } from "./context/stateProvider";
import "./Register.css";

import { makeStyles } from "@material-ui/core";
import TextField from "@material-ui/core/TextField";
import IconButton from "@material-ui/core/IconButton";
import ArrowBackIcon from "@material-ui/icons/ArrowBack";
import AlternateEmailIcon from "@material-ui/icons/AlternateEmail";
import Button from "@material-ui/core/Button";
import MoreHorizIcon from "@material-ui/icons/MoreHoriz";

const useStyles = makeStyles((theme) => ({
  logo: {
    width: 40,
    height: 40,
  },
  logo2: {
    width: 18,
    height: 18,
  },
  logoPositionLeft: {
    alignSelf: "start",
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

function Register() {
  const classes = useStyles();
  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [password2, setPassword2] = useState("");
  const [{ user }, dispatch] = useStateValue();
  const errors = [];

  const history = useHistory();

  const register = async (e) => {
    e.preventDefault();
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
          history.push("/whatsapp-clone/conversations");
        }
      })
      .catch((err) => {
        console.log("Error registering user");
        console.log(err.response.data);
        for (let k in err.errors) {
          errors.push([err.errors[k]]);
        }
        console.log(errors);
      });
  };

  return (
    <form>
      <div className="register">
        <Link to="/whatsapp-clone/login" className={classes.logoPositionLeft}>
          <IconButton>
            <ArrowBackIcon className={classes.logo2} />
          </IconButton>
        </Link>

        <Link to="/whatsapp-clone/login">
          <IconButton>
            <AlternateEmailIcon className={classes.logo} />
          </IconButton>
        </Link>

        <p> New Account </p>

        <ul>
          {errors.map((errorMessage) => (
            <li>{errorMessage}</li>
          ))}
        </ul>

        <TextField
          className={`${classes.textField} ${classes.margin}`}
          label="First name"
          variant="outlined"
          value={firstname}
          onChange={(e) => setFirstname(e.target.value)}
        />
        <TextField
          className={`${classes.textField} ${classes.margin}`}
          label="Last name"
          variant="outlined"
          value={lastname}
          onChange={(e) => setLastname(e.target.value)}
        />
        <MoreHorizIcon className={classes.margin} />
        <TextField
          className={`${classes.textField} ${classes.margin}`}
          label="Email address"
          variant="outlined"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <TextField
          className={`${classes.textField} ${classes.margin}`}
          label="Password"
          variant="outlined"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <TextField
          className={`${classes.textField} ${classes.margin}`}
          label="Confirm password"
          variant="outlined"
          type="password"
          value={password2}
          onChange={(e) => setPassword2(e.target.value)}
        />

        <Button
          className={`${classes.button} ${classes.margin}`}
          color="primary"
          variant="contained"
          type="submit"
          onClick={(e) => register(e)}
        >
          Sign Up
        </Button>
      </div>
    </form>
  );
}

export default Register;

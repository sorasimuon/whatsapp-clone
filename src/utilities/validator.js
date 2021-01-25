import { NetworkCheckSharp } from "@material-ui/icons";
import isEmpty from "is-empty";

const validateInput = (
  { firstname = "", lastname = "", email, password, password2 = "" },
  checktype
) => {
  const errors = {};
  const mailFormat = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;

  switch (checktype) {
    case "login":
      if (isEmpty(email)) {
        errors.email = "Email is empty";
      } else if (!email.match(mailFormat)) {
        errors.email = "Email wrong format";
      }
      if (isEmpty(password)) {
        errors.password = "Password  is empty";
      }
      break;

    case "register":
      if (isEmpty(firstname)) {
        errors.firstname = "Firstname is empty";
      }
      if (isEmpty(lastname)) {
        errors.lastname = "Lastname is empty";
      }
      if (isEmpty(email)) {
        errors.email = "Email is empty";
      } else if (!email.match(mailFormat)) {
        errors.email = "Email wrong format";
      }
      if (isEmpty(password) || isEmpty(password2)) {
        if (isEmpty(password)) {
          errors.password = "Password  is empty";
        }
        if (isEmpty(password2)) {
          console.log("error");
          errors.password2 = "Confirm Password is empty";
        }
      } else if (password !== password2) {
        errors.password = "Error confirming the password";
      }
      break;
    default:
      break;
  }

  return {
    errors,
    isValid: isEmpty(errors),
  };
};

export default validateInput;

import React from "react";
import Validator from "validator";
import isEmpty from "is-empty";

const validateInput = (
  { firstname = "", lastname = "", email, password, password2 = "" },
  checktype
) => {
  let errors = [];

  switch (checktype) {
    case "login":
      //   const { email, password } = input;
      //check email
      if (!Validator.isEmpty(email)) {
        if (!Validator.isEmail(email)) {
          errors.push("Error format email");
        }
      } else {
        errors.push("Username is required");
      }

      // check Password
      if (Validator.isEmpty(password)) {
        errors.push("Password is required");
      }

      break;
    case "register":
      //   const { firstname, lastname, email, password, password2 } = input;

      // check firstname
      errors.push(Validator.isEmpty(firstname) ? "First name is required" : "");
      errors.push(Validator.isEmpty(lastname) ? "Last name is required" : "");

      //check email
      if (!Validator.isEmpty(email)) {
        if (!Validator.isusername(email)) {
          errors.push("Error format email");
        }
      } else {
        errors.push("email is required");
      }

      // check Password
      errors.push(Validator.isEmpty(password) ? "Password is required" : "");
      errors.push(Validator.isEmpty(password2) ? "Password2 is required" : "");
      break;
  }
  return {
    errors,
    isValid: isEmpty(errors),
  };
};

export default validateInput;

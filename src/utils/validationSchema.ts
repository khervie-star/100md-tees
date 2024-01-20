import * as Yup from "yup";
import { getCharacterValidationError } from ".";

export const login_schema = Yup.object().shape({
  email: Yup.string()
    .email("Enter a valid email")
    .required("Email is required"),
  password: Yup.string().required("Password is required"),
});

export const signup_Schema = Yup.object().shape({
  firstName: Yup.string()
    .min(2, "First name is too Short!")
    .max(50, "First name is too Long!")
    .required("First name is required"),
  nickName: Yup.string()
    .min(2, "Nickname is too Short!")
    .max(50, "Nickname is too Long!")
    .required("Nickname is required"),
  lastName: Yup.string()
    .min(2, "Last name is too Short!")
    .max(50, "Last name is too Long!")
    .required("Last name is required"),
  email: Yup.string().email("Invalid email").required("Email is required"),
  password: Yup.string()
    .required("Password is required")
    // check minimum characters
    .min(8, "Password must have at least 8 characters")
    // different error messages for different requirements
    .matches(/[0-9]/, "Your password must have at least 1 digit")
    .matches(/[a-z]/, "Your password must have at least 1 lowercase character")
    .matches(/[A-Z]/, "Your password must have at least 1 uppercase character"),
  confirmPassword: Yup.string()
    .required("Please re-type your password")
    // use oneOf to match one of the values inside the array.
    // use "ref" to get the value of password.
    .oneOf([Yup.ref("password")], "Passwords does not match"),
});

export const reset_password_schema = Yup.object().shape({
  password: Yup.string()
    .required("Password is required")
    // check minimum characters
    .min(8, "Password must have at least 8 characters")
    // different error messages for different requirements
    .matches(/[0-9]/, "Your password must have at least 1 digit")
    .matches(/[a-z]/, "Your password must have at least 1 lowercase character")
    .matches(/[A-Z]/, "Your password must have at least 1 uppercase character"),
  confirmPassword: Yup.string()
    .required("Please re-type your password")
    // use oneOf to match one of the values inside the array.
    // use "ref" to get the value of password.
    .oneOf([Yup.ref("password")], "Passwords does not match"),
});

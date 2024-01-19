import * as Yup from "yup";

export const login_schema = Yup.object().shape({
  email: Yup.string()
    .email("Enter a valid email")
    .required("Email is required"),
  password: Yup.string().required("Password is required"),
});

export const SignupSchema = Yup.object().shape({
  firstName: Yup.string()
    .min(2, "Too Short!")
    .max(50, "Too Long!")
    .required("Required"),
  lastName: Yup.string()
    .min(2, "Too Short!")
    .max(50, "Too Long!")
    .required("Required"),
  email: Yup.string().email("Invalid email").required("Required"),
});

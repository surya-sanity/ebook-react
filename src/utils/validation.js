import * as yup from "yup";

const emailSchema = yup
  .string()
  .email("Enter a valid Email")
  .transform((curr, orig) => (orig === null ? "" : curr))
  .required("Required")
  .max(50, "Email can be max 50 characters long !")
  .matches(
    /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
    "Enter a valid Email"
  );

export const loginValidationSchema = yup.object().shape({
  email: emailSchema,
  password: yup.string().required("Required"),
});

export const signUpValidationSchema = yup.object().shape({
  firstName: yup
    .string()
    .matches(/^(\s+\S+\s*)*(?!\s).*$/, "Required")
    .max(25, "Firstname can be max 25 characters long")
    .required("Required")
    .transform((curr, orig) => (orig === null ? "" : curr)),
  lastName: yup
    .string()
    .matches(/^(\s+\S+\s*)*(?!\s).*$/, "Required")
    .max(25, "Lastname can be max 25 characters long")
    .required("Required")
    .transform((curr, orig) => (orig === null ? "" : curr)),
  email: emailSchema,
  password: yup
    .string()
    .trim()
    .required("Required")
    .transform((curr, orig) => (orig === null ? "" : curr)),
});

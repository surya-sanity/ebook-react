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

export const createBookValidation = yup.object().shape({
  title: yup
    .string()
    .max(50, "Title can be max 50 characters long")
    .required("Required")
    .transform((curr, orig) => (orig === null ? "" : curr)),
  author: yup
    .string()
    .max(50, "Author name can be max 50 characters long")
    .required("Required")
    .transform((curr, orig) => (orig === null ? "" : curr)),
  shortDescription: yup
    .string()
    .required("Required")
    .transform((curr, orig) => (orig === null ? "" : curr)),
  longDescription: yup
    .string()
    .required("Required")
    .transform((curr, orig) => (orig === null ? "" : curr)),
  thumbnailUrl: yup
    .string()
    .required("Required")
    .transform((curr, orig) => (orig === null ? "" : curr)),
  genre: yup
    .string()
    .max(30, "Genre can be max 30 characters long")
    .required("Required")
    .transform((curr, orig) => (orig === null ? "" : curr)),
  pricePerDay: yup
    .number()
    .transform((value) => (isNaN(value) ? undefined : value))
    .required("Required")
    .min(5, "Price should be atleast $5 ")
    .max(50, "Maximum price per day can be $50 "),
});

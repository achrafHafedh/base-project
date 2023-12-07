import * as Yup from "yup";

const schemaRegister = Yup.object().shape({
  email: Yup.string()
    .required("Email is a required field")
    .email("Invalid email format"),
  firstName: Yup.string().required("firstName is a required field"),
  lastName: Yup.string().required("lastName is a required field"),
  organisation: Yup.string().required("organisation is a required field"),
  phone: Yup.string().required("phone is a required field"),
});

export default schemaRegister;

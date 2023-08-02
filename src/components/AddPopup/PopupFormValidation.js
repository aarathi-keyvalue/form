import * as yup from "yup";

const PopupFormSchema = yup.object().shape({
  name: yup.string().required("Required field"),
  phone: yup
    .string()
    .required("Required field")
    .matches(/^[0-9]{10}$/, { message: "Invalid phone number" }),
  email: yup.string().email("Invalid Email").required("Required field"),
  text: yup.string().required("Required field"),
  desc: yup.string().required("Required field"),
});

export default PopupFormSchema;

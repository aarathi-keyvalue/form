import * as yup from "yup";

const LoginFormSchema = yup.object().shape({
  username: yup.string().required("Username is required"),
  password: yup.string().required("Enter your password"),
});

export default LoginFormSchema;

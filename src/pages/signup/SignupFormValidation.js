import * as yup from "yup";

const SignUpFormSchema = yup.object().shape({
  username: yup.string().required("Username is required"),
  password: yup
    .string()
    .required("Enter your password")
    .max(15, "Atmost 15 characters")
    .min(8, "Atleast 8 characters"),
  confirmPassword: yup
    .string()
    .required('Confirm your password')
    .oneOf([yup.ref("password")], "Password must match"),
});

export default SignUpFormSchema;

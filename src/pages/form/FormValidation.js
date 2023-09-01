import * as yup from "yup";

const FormSchema = yup.object().shape({
  name: yup.string().required("Name is a required field"),
  degree: yup.string().required("Please select a valid option"),
  country: yup.string().required("Please select a valid option"),
  gender: yup.string().required("Please select a valid option"),
  phoneNumber: yup
    .string()
    .required("Phone Number is a required field")
    .matches(/^[0-9]{10}$/, {
      message: "Invalid phone number",
    }),
  image: yup
    .mixed()
    .required("Upload your image")
    .test(
      "fileSize",
      "Max. size 20KB",
      (value) => {
        if (!value) return true;

        const fileSizeInBytes = value.size || 0;
        const maxSizeInBytes = 20 * 1024;
        return fileSizeInBytes <= maxSizeInBytes;
      }
    ),
  agreeTndC: yup
    .boolean()
    .oneOf([true], "You must accept the terms and conditions"),
  declaration: yup.boolean().oneOf([true], "Please check the box"),
  people: yup
    .array()
    .of(
      yup.object().shape({
        firstName: yup.string().required("First Name is required"),
        lastName: yup.string().required("Last Name is required"),
        gender: yup.string().required("Select an option"),
        age: yup
          .string()
          .test("minAge", "Age cannot be less than zero", (value) => value >= 0)
          .required("Age is required"),
      })
    )
    .max(5, "Unable to add more than 5 people"),
});

export default FormSchema;

import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";

import { Button, Input } from "../../components";
import SignUpFormSchema from "./SignupFormValidation";

const Signup = () => {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(SignUpFormSchema),
    defaultValues: {
      username: "",
      password: "",
      confirmPassword: "",
    },
  });

  const handleFormSubmit = (data) => console.log("data", data);

  return (
    <div className="w-full h-full flex justify-center items-center">
      <form onSubmit={handleSubmit(handleFormSubmit)}>
        <div className="h-fit flex flex-col gap-y-7 border p-10 pb-14 rounded-md shadow-md">
          <Input
            name="username"
            placeholder="Username"
            control={control}
            error={errors.username}
          />
          <Input
            name="password"
            placeholder="Password"
            control={control}
            error={errors.password}
          />
          <Input
            name="confirmPassword"
            placeholder="Confirm Password"
            control={control}
            error={errors.confirmPassword}
          />
          <Button
            label="Submit"
            type="submit"
            buttonStyles="bg-primaryColor w-full text-white font-medium"
          />
        </div>
      </form>
    </div>
  );
};

export default Signup;

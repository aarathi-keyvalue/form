import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router";

import { Button, Input } from "../../components";
import { routes } from "../../routes/routes";
import LoginFormSchema from "./LoginFormValidation";

const Login = () => {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(LoginFormSchema),
    defaultValues: {
      username: "",
      password: "",
    },
  });

  const navigate = useNavigate();

  const onSignupClick = () => {
    navigate(`${routes.SIGN_UP}`);
  };

  const handleFormSubmit = (data) => console.log("data", data);

  return (
    <div className="w-full h-full flex justify-center items-center">
      <form onSubmit={handleSubmit(handleFormSubmit)}>
        <div className="relative h-fit flex flex-col gap-y-7 border p-10 pb-14 rounded-md shadow-md">
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
          <Button
            label="Submit"
            type="submit"
            buttonStyles="bg-primaryColor w-full text-white font-medium"
          />
          <div className="absolute bottom-7 left-20 flex gap-x-2">
            <span className="text-xs">Don't have an account?</span>
            <span
              className="text-xs text-primaryColor cursor-pointer"
              onClick={onSignupClick}
            >
              Sign Up
            </span>
          </div>
        </div>
      </form>
    </div>
  );
};

export default Login;

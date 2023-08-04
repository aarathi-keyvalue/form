import { useEffect, useState } from "react";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router";
import { useDispatch, useSelector } from "react-redux";

import { Button, Input } from "../../components";
import { routes } from "../../routes/routes";
import { authenticate } from "../../store/user";
import LoginFormSchema from "./LoginFormValidation";

const Login = () => {
  const {
    reset,
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

  const [showError, setShowError] = useState(false);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { users } = useSelector((state) => state.users);

  const onSignupClick = () => {
    navigate(`${routes.SIGN_UP}`);
  };

  useEffect(() => {
    if (showError) {
      setTimeout(() => setShowError(false), 1700);
    }
  }, [showError]);

  const handleFormSubmit = (data) => {
    if (
      users.find(
        (user) =>
          user.username === data.username && user.password === data.password
      )
    ) {
      dispatch(authenticate());
      localStorage.setItem("isAuthenticated", true);
    } else setShowError(true);
    reset();
  };

  return (
    <div className="relative w-full h-full flex justify-center items-center">
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
            label="Login"
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
      {showError && (
        <div
          className={`absolute top-0 border border-primaryColor/30 bg-hawksBlue/30 p-5 rounded-md mt-10`}
        >
          Invalid username or password. Try Again
        </div>
      )}
    </div>
  );
};

export default Login;

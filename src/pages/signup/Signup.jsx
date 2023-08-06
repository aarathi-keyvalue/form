import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router";

import { Button, Input } from "../../components";
import { addUser } from "../../store/user";
import { routes } from "../../routes/routes";
import SignUpFormSchema from "./SignupFormValidation";

const Signup = () => {
  const {
    reset,
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

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { users } = useSelector((state) => state.users);

  const onLoginClick = () => {
    navigate(routes.LOGIN);
  };

  const handleFormSubmit = (data) => {
    localStorage.setItem(
      "users",
      JSON.stringify([
        ...users,
        { username: data.username, password: data.password },
      ])
    );
    dispatch(addUser({ username: data.username, password: data.password }));
    navigate(routes.LOGIN);
    reset();
  };

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
            type="password"
            placeholder="Password"
            control={control}
            error={errors.password}
          />
          <Input
            name="confirmPassword"
            type="password"
            placeholder="Confirm Password"
            control={control}
            error={errors.confirmPassword}
          />
          <Button
            label="Sign Up"
            type="submit"
            buttonStyles="bg-primaryColor w-full text-white font-medium"
          />
          <div className="absolute bottom-7 left-20 flex gap-x-2">
            <span className="text-xs">Already have an account?</span>
            <span
              className="text-xs text-primaryColor cursor-pointer"
              onClick={onLoginClick}
            >
              Login
            </span>
          </div>
        </div>
      </form>
    </div>
  );
};

export default Signup;

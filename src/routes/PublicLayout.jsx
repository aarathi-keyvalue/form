import { Navigate, Route, Routes } from "react-router";
import { routes } from "./routes";
import Signup from "../pages/signup/Signup";
import Login from "../pages/login/Login";

const PublicLayout = () => {
  return (
    <div className="w-full h-full flex">
      <Routes>
        <Route path={routes.SIGN_UP} element={<Signup />} />
        <Route path={routes.LOGIN} element={<Login />} />
        <Route
          path={routes.ALL}
          element={<Navigate replace to={routes.LOGIN} />}
        />
      </Routes>
    </div>
  );
};

export default PublicLayout;

import { Navigate, Route, Routes } from "react-router";
import { routes } from "./routes";
import Signup from "../pages/signup/Signup";
import Signin from "../pages/signin/Signin";

const PublicLayout = () => {
  return (
    <div className="w-full h-full flex">
      <Routes>
        <Route path={routes.SIGN_UP} element={<Signup />} />
        <Route path={routes.SIGN_IN} element={<Signin />} />
        <Route
          path={routes.ALL}
          element={<Navigate replace to={routes.SIGN_UP} />}
        />
      </Routes>
    </div>
  );
};

export default PublicLayout;

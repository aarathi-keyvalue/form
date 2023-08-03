import { Route, Routes } from "react-router-dom";

import { routes } from "./routes";
import PrivateLayout from "./PrivateLayout";
import PublicLayout from "./PublicLayout";

const RouteLayout = () => {
  const isAuthenticated = false;

  return (
    <div className="w-full h-[100vh] flex">
      <Routes>
        <Route
          path={routes.ALL}
          element={isAuthenticated ? <PrivateLayout /> : <PublicLayout />}
        />
      </Routes>
    </div>
  );
};

export default RouteLayout;

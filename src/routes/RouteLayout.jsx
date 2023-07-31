import { useState } from "react";
import { Navigate, Route, Routes, useNavigate } from "react-router-dom";

import { routes } from "./routes";
import { navConstants } from "../constants/common";
import Form from "../pages/form/Form";
import Country from "../pages/country/Country";

const RouteLayout = () => {
  const [selectedTab, setSelectedTab] = useState(navConstants[0].path);

  const navigate = useNavigate();

  const handleTabClick = (path) => {
    setSelectedTab(path);
    navigate(path);
  };

  return (
    <div className="w-full h-[100vh] flex">
      <div className="w-1/5 h-full px-2 py-20 flex flex-col gap-y-3 border-r">
        {navConstants.map((navItem) => (
          <div
            key={navItem.path}
            className={`w-full rounded-md px-5 py-2 hover:bg-harp/60 cursor-pointer ${
              selectedTab === navItem.path
                ? "text-primaryColor bg-hawksBlue/30"
                : "text-black"
            }`}
            onClick={() => handleTabClick(navItem.path)}
          >
            {navItem.label}
          </div>
        ))}
      </div>
        <Routes>
          <Route path={routes.COUNTRY_LIST} element={<Country />} />
          <Route path={routes.FORM} element={<Form />} />
          <Route
            path={routes.ALL}
            element={<Navigate replace={true} to={routes.FORM} />}
          />
        </Routes>
    </div>
  );
};

export default RouteLayout;

import { useEffect, useState } from "react";
import { Navigate, Route, Routes, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";

import { routes } from "./routes";
import { navConstants } from "../constants/common";
import { Avatar } from "../assets/images";
import { updateIsAuthenticated } from "../store/user";
import Form from "../pages/form/Form";
import Country from "../pages/country/Country";
import CountryDetail from "../pages/country-detail/CountryDetail";

const PrivateLayout = () => {
  const [selectedTab, setSelectedTab] = useState();

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { pathname } = window.location;

  useEffect(() => {
    setSelectedTab("/" + pathname.split("/")[1]);
  }, [pathname]);

  const handleTabClick = (path) => {
    setSelectedTab(path);
    navigate(path);
  };

  const onLogout = () => {
    dispatch(updateIsAuthenticated("false"));
    localStorage.setItem("isAuthenticated", "false");
  };

  return (
    <div className="w-full h-[100vh] flex">
      <div className="w-1/5 h-full flex flex-col justify-between border-r px-2">
        <div className="pt-20 flex flex-col gap-y-3">
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
        <div className="mb-2 px-5 py-5 bg-hawksBlue/50 rounded-md flex items-center gap-x-5">
          <img src={Avatar} alt="profile" className="w-8 h-8 rounded-full" />
          <div className="cursor-pointer" onClick={onLogout}>
            Logout
          </div>
        </div>
      </div>
      <Routes>
        <Route path={routes.COUNTRY_LIST} element={<Country />} />
        <Route path={routes.FORM} element={<Form />} />
        <Route
          path={`${routes.COUNTRY_LIST}/:country`}
          element={<CountryDetail />}
        />
        <Route
          path={routes.ALL}
          element={<Navigate replace={true} to={routes.FORM} />}
        />
      </Routes>
    </div>
  );
};

export default PrivateLayout;

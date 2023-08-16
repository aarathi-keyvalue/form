import { useEffect, useState } from "react";
import { Navigate, Route, Routes, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import { routes } from "./routes";
import { navConstants } from "../constants/common";
import { Avatar } from "../assets/images";
import { updateIsAuthenticated } from "../store/user";
import { CloseIcon } from "../assets/icons";
import { updateNavOpen } from "../store/leftNav";
import Form from "../pages/form/Form";
import Country from "../pages/country/Country";
import CountryDetail from "../pages/country-detail/CountryDetail";

const PrivateLayout = () => {
  const [selectedTab, setSelectedTab] = useState();

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { pathname } = window.location;

  const { isNavOpen } = useSelector((state) => state.leftNav);

  useEffect(() => {
    setSelectedTab("/" + pathname.split("/")[1]);
  }, [pathname]);

  const handleTabClick = (path) => {
    setSelectedTab(path);
    navigate(path);
    dispatch(updateNavOpen(false));
  };

  const onLogout = () => {
    dispatch(updateIsAuthenticated("false"));
    localStorage.setItem("isAuthenticated", "false");
  };

  const handleNavClick = () => {
    dispatch(updateNavOpen(false));
  };

  return (
    <div
      className={`relative w-full h-screen flex overflow-y-hidden flex-col sm:flex-row`}
    >
      {/* mobile view */}
      <div
        className={`relative bg-white z-[100] h-screen min-h-screen px-2 pt-20 flex flex-col justify-between gap-y-3 w-full ${
          isNavOpen ? "animate-slide-to-right" : "animate-slide-to-left"
        } sm:hidden sm:w-0`}
      >
        <div className="absolute top-5 right-5">
          <CloseIcon width={40} height={40} onClick={handleNavClick} />
        </div>
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
        <div
          className="mb-2 px-5 py-5 bg-hawksBlue/50 rounded-md flex items-center gap-x-5 cursor-pointer"
          onClick={onLogout}
        >
          <img src={Avatar} alt="profile" className="w-8 h-8 rounded-full" />
          <div>Logout</div>
        </div>
      </div>

      {/* desktop view */}
      <div
        className={`bg-white px-2 pt-20 flex-col gap-y-3 border-r sm:h-screen w-1/5 sm:flex justify-between`}
      >
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
        <div
          className="mb-2 px-5 py-5 bg-hawksBlue/50 rounded-md flex items-center gap-x-5 cursor-pointer"
          onClick={onLogout}
        >
          <img src={Avatar} alt="profile" className="w-8 h-8 rounded-full" />
          <div>Logout</div>
        </div>
      </div>

      <div className="absolute top-0 right-0 w-full sm:w-4/5">
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
    </div>
  );
};

export default PrivateLayout;

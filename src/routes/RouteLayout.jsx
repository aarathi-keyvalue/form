import { useEffect, useState } from "react";
import { Navigate, Route, Routes, useNavigate } from "react-router-dom";

import { routes } from "./routes";
import { navConstants } from "../constants/common";
import Form from "../pages/form/Form";
import Country from "../pages/country/Country";
import CountryDetail from "../pages/country-detail/CountryDetail";
import FloatingBtn from "../components/FloatingBtn";
import AddPopup from "../components/AddPopup/AddPopup";
import UsersListing from "../pages/users/UsersListing";
import UserDetail from "../pages/user-detail/UserDetail";

const RouteLayout = () => {
  const [selectedTab, setSelectedTab] = useState();
  const [isOpen, setIsOpen] = useState(false);
  const [showPopup, setShowPopup] = useState(isOpen);

  useEffect(() => {
    if (!isOpen) {
      setTimeout(() => setShowPopup(false), 710);
    } else setShowPopup(isOpen);
  }, [isOpen]);

  const navigate = useNavigate();
  const { pathname } = window.location;

  useEffect(() => {
    setSelectedTab("/" + pathname.split("/")[1]);
  }, [pathname]);

  const handleTabClick = (path) => {
    setSelectedTab(path);
    navigate(path);
  };

  return (
    <div className="relative w-full h-[100vh] flex overflow-y-hidden">
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
        <Route path={`${routes.FORM}/:userId`} element={<Form />} />
        <Route path={routes.USERS} element={<UsersListing />} />
        <Route path={`${routes.USERS}/:userId`} element={<UserDetail />} />
        <Route
          path={`${routes.COUNTRY_LIST}/:country`}
          element={<CountryDetail />}
        />
        <Route
          path={routes.ALL}
          element={<Navigate replace={true} to={routes.FORM} />}
        />
      </Routes>
      {showPopup ? (
        <AddPopup isOpen={isOpen} onClick={() => setIsOpen(false)} />
      ) : (
        <FloatingBtn
          onClick={() => setIsOpen(true)}
          className="absolute bottom-3 right-7 float-right"
        />
      )}
    </div>
  );
};

export default RouteLayout;

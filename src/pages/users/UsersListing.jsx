import { useNavigate } from "react-router";
import { useDispatch, useSelector } from "react-redux";

import { topBarConstants } from "../../constants/common";
import { routes } from "../../routes/routes";
import { GENDER_LABELS, QUALIFICATION_LABELS } from "../../constants/form";
import { capitalise } from "../../utils/generalUtils";
import {
  CrossIcon,
  DeleteLightIcon,
  EditLightIcon,
  TickIcon,
} from "../../assets/icons";
import { updateUser } from "../../store/form";
import { NoDataFound } from "../../assets/images";
import TopBar from "../../components/TopBar";

const UsersListing = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { usersList } = useSelector((state) => state.form);

  const fontStyle = "font-light";
  const cellStyle = "w-1/6";

  const editUser = (userId) => {
    const user = usersList.find((user) => user.createdAt === userId);
    navigate(`${routes.FORM}/${user.createdAt}`);
  };

  const deleteUser = (userId) => {
    const users = usersList.filter((user) => user.createdAt !== userId);
    localStorage.setItem("listedUsers", JSON.stringify(users));
    dispatch(updateUser(users));
  };

  const disableUser = (userId) => {
    const userIndex = usersList.findIndex((user) => user.createdAt === userId);
    const user = usersList[userIndex];
    const updatedUserList = [...usersList];
    updatedUserList.splice(userIndex, 1, {
      ...user,
      isActive: !user.isActive,
    });
    localStorage.setItem("listedUsers", JSON.stringify(updatedUserList));
    dispatch(updateUser(updatedUserList));
  };

  return (
    <div className="w-full h-full">
      <TopBar headerText={topBarConstants.USER_DETAILS} />
      <div className="w-full h-[calc(100vh-93px)] bg-harp p-4 overflow-y-auto sm:p-10">
        {usersList && usersList.length > 0 ? (
          <>
            <div className="flex px-5 gap-x-5 mb-3 font-medium">
              <div className={cellStyle}>Name</div>
              <div className={cellStyle}>Qualification</div>
              <div className={cellStyle}>Gender</div>
              <div className={cellStyle}>Country</div>
              <div className={cellStyle}>Phone Number</div>
              <div className={cellStyle}>Actions</div>
            </div>
            <div className="w-full flex flex-col gap-y-5">
              {usersList.map((user) => (
                <div
                  key={user.createdAt}
                  className={`flex items-center gap-x-5 px-5 py-4 rounded-md shadow-md ${
                    user.isActive
                      ? "bg-white hover:scale-[99%] cursor-pointer"
                      : ""
                  }`}
                  onClick={() => {
                    if (user.isActive) {
                      navigate(`${routes.USERS}/${user.createdAt}`);
                    }
                  }}
                >
                  <div className={`flex gap-x-3 items-center ${cellStyle}`}>
                    <div className="w-12 h-12 rounded-full bg-white">
                      <img
                        src={user.image}
                        alt="profile"
                        className="object-contain w-full h-full rounded-full"
                      />
                    </div>
                    <div
                      className={`${fontStyle} ${
                        user.isActive ? "text-black" : "text-comet"
                      }`}
                    >
                      {capitalise(user.name)}
                    </div>
                  </div>
                  <div
                    className={`${fontStyle} ${cellStyle} ${
                      user.isActive ? "text-black" : "text-comet"
                    }`}
                  >
                    {QUALIFICATION_LABELS[user.degree]}
                  </div>
                  <div
                    className={`${fontStyle} ${cellStyle} ${
                      user.isActive ? "text-black" : "text-comet"
                    }`}
                  >
                    {GENDER_LABELS[user.gender]}
                  </div>
                  <div
                    className={`${fontStyle} ${cellStyle} ${
                      user.isActive ? "text-black" : "text-comet"
                    }`}
                  >
                    {user.country}
                  </div>
                  <div
                    className={`${fontStyle} ${cellStyle} ${
                      user.isActive ? "text-black" : "text-comet"
                    }`}
                  >
                    {user.phoneNumber}
                  </div>
                  <div className={`${cellStyle} flex items-center`}>
                    <div
                      className={`p-3 ${user.isActive ? "cursor-pointer" : ""}`}
                      onClick={(e) => {
                        if (user.isActive) {
                          e.stopPropagation();
                          editUser(user.createdAt);
                        }
                      }}
                    >
                      <EditLightIcon width={20} height={20} />
                    </div>
                    <div
                      className={`p-3 ${user.isActive ? "cursor-pointer" : ""}`}
                      onClick={(e) => {
                        if (user.isActive) {
                          e.stopPropagation();
                          deleteUser(user.createdAt);
                        }
                      }}
                    >
                      <DeleteLightIcon width={18} height={18} />
                    </div>
                    <div
                      className="p-3 cursor-pointer"
                      onClick={(e) => {
                        e.stopPropagation();
                        disableUser(user.createdAt);
                      }}
                    >
                      {user.isActive ? (
                        <TickIcon height={18} width={18} />
                      ) : (
                        <CrossIcon height={16} width={16} />
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </>
        ) : (
          <div className="w-full bg-white min-h-full rounded-sm shadow-sm items-center justify-center flex flex-col">
            <img src={NoDataFound} alt="" width={500} height={500} />
            <p className="font-medium text-xl">No Data Found.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default UsersListing;

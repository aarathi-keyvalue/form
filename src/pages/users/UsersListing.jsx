import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import { topBarConstants } from "../../constants/common";
import { NoDataFound } from "../../assets/images";
import { SortableList, TopBar } from "../../components";
import { routes } from "../../routes/routes";
import { updateUser } from "../../store/form";
import CardView from "../user-detail/components/CardView";

const UsersListing = () => {
  const { usersList } = useSelector((state) => state.form);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const cellStyle = "w-1/6";

  const handleSave = () =>
    localStorage.setItem("listedUsers", JSON.stringify(usersList));

  const editUser = (e, userId, isActive) => {
    if (isActive) {
      e.stopPropagation();
      const user = usersList.find((user) => user.createdAt === userId);
      navigate(`${routes.FORM}/${user.createdAt}`);
    }
  };

  const deleteUser = (e, userId, isActive) => {
    if (isActive) {
      e.stopPropagation();
      const users = usersList.filter((user) => user.createdAt !== userId);
      dispatch(updateUser(users));
    }
  };

  const disableUser = (e, userId) => {
    e.stopPropagation();
    const userIndex = usersList.findIndex((user) => user.createdAt === userId);
    const user = usersList[userIndex];
    const updatedUserList = [...usersList];
    updatedUserList.splice(userIndex, 1, {
      ...user,
      isActive: !user.isActive,
    });
    dispatch(updateUser(updatedUserList));
  };

  return (
    <div className="w-full h-full">
      <TopBar
        headerText={topBarConstants.USER_DETAILS}
        isButtonRequired
        buttonText="Save to Local"
        onButtonClick={handleSave}
      />
      <div className="w-full h-[calc(100vh-93px)] bg-harp p-4 overflow-y-auto sm:p-10">
        <CardView
          cardItems={usersList}
          onEditClick={editUser}
          onDeleteClick={deleteUser}
          onDisableClick={disableUser}
        />
        {usersList && usersList.length > 0 ? (
          <div className="hidden sm:flex sm:flex-col">
            <div className="flex px-5 gap-x-5 mb-3 font-medium">
              <div className={cellStyle}>Name</div>
              <div className={cellStyle}>Qualification</div>
              <div className={cellStyle}>Gender</div>
              <div className={cellStyle}>Country</div>
              <div className={cellStyle}>Phone Number</div>
              <div className={cellStyle}>Actions</div>
            </div>

            <SortableList
              listItems={usersList}
              editUser={editUser}
              deleteUser={deleteUser}
              disableUser={disableUser}
            />
          </div>
        ) : (
          <div className="w-full bg-white min-h-full rounded-sm shadow-sm items-center justify-center flex flex-col">
            <img src={NoDataFound} alt="" width={500} height={500} />
            <p className="font-medium text-xl">
              No Data Found.{" "}
              <span
                className="text-primaryColor text-sm cursor-pointer"
                onClick={() => navigate(routes.FORM)}
              >
                Add User
              </span>
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default UsersListing;

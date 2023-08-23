import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import { topBarConstants } from "../../constants/common";
import { NoDataFound } from "../../assets/images";
import { SortableList, TopBar } from "../../components";
import { routes } from "../../routes/routes";

const UsersListing = () => {
  const { usersList } = useSelector((state) => state.form);

  const navigate = useNavigate();

  const handleSave = () => {
    localStorage.setItem("listedUsers", JSON.stringify(usersList));
  };

  const cellStyle = "w-1/6";
  return (
    <div className="w-full h-full">
      <TopBar
        headerText={topBarConstants.USER_DETAILS}
        isButtonRequired
        buttonText="Save to Local"
        onButtonClick={handleSave}
      />
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

            <SortableList listItems={usersList} />
          </>
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

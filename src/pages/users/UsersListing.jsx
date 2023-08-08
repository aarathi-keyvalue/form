import { useNavigate } from "react-router";
import { useSelector } from "react-redux";

import { topBarConstants } from "../../constants/common";
import { routes } from "../../routes/routes";
import { GENDER_LABELS, QUALIFICATION_LABELS } from "../../constants/form";
import { capitalise } from "../../utils/generalUtils";
import TopBar from "../../components/TopBar";

const UsersListing = () => {
  const navigate = useNavigate();
  const { usersList } = useSelector((state) => state.form);

  const fontStyle = "font-light";

  return (
    <div className="w-full h-full">
      <TopBar
        headerText={topBarConstants.USER_DETAILS}
        showNavigateBack
        handleBackClick={() => {
          navigate(routes.FORM);
        }}
      />
      <div className="w-full h-[calc(100vh-93px)] bg-harp p-4 overflow-y-auto sm:p-10">
        <div className="flex px-5 gap-x-5 mb-3 font-medium">
          <div className="w-1/5">Name</div>
          <div className="w-1/5">Qualification</div>
          <div className="w-1/5">Gender</div>
          <div className="w-1/5">Country</div>
          <div className="w-1/5">Phone Number</div>
        </div>
        <div className="w-full flex flex-col gap-y-5">
          {usersList.map((user) => (
            <div
              key={user.name}
              className="flex items-center gap-x-5 bg-white px-5 py-4 rounded-md shadow-md cursor-pointer hover:scale-[99%]"
              onClick={() => navigate(`${routes.USERS}/${user.phoneNumber}`)}
            >
              <div className="flex gap-x-3 items-center w-1/5">
                <div className="w-12 h-12 rounded-full bg-white">
                  <img
                    src={user.image}
                    alt="profile"
                    className="object-contain w-full h-full rounded-full"
                  />
                </div>
                <div className={fontStyle}>{capitalise(user.name)}</div>
              </div>
              <div className={`w-1/5 ${fontStyle}`}>
                {QUALIFICATION_LABELS[user.degree]}
              </div>
              <div className={`w-1/5 ${fontStyle}`}>
                {GENDER_LABELS[user.gender]}
              </div>
              <div className={`w-1/5 ${fontStyle}`}>{user.country}</div>
              <div className={`w-1/5 ${fontStyle}`}>{user.phoneNumber}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default UsersListing;

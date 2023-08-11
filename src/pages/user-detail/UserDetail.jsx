import { useNavigate, useParams } from "react-router";
import { useSelector } from "react-redux";

import { routes } from "../../routes/routes";
import { capitalise } from "../../utils/generalUtils";
import { GENDER_LABELS, QUALIFICATION_LABELS } from "../../constants/form";
import { topBarConstants } from "../../constants/common";
import TopBar from "../../components/TopBar";

const UserDetail = () => {
  const navigate = useNavigate();
  const { userId } = useParams();
  const { usersList } = useSelector((state) => state.form);

  const user = usersList.find((user) => user.createdAt === userId);

  return (
    <div className="w-full h-full">
      <TopBar
        headerText={topBarConstants.USER_DETAILS}
        showNavigateBack
        handleBackClick={() => navigate(routes.USERS)}
      />
      <div className="w-full h-[calc(100vh-93px)] bg-harp p-4 sm:p-10">
        <div className="bg-white w-full min-h-full rounded-md shadow-sm p-12">
          <div className="h-36 w-36 mb-10 border rounded-full">
            <img
              src={user.image}
              className="object-contain w-full h-full rounded-full"
              alt="profile"
            />
          </div>
          <div className="flex gap-x-5">
            <div className="font-medium text-base">
              <div>Name:</div>
              <div>Qualification:</div>
              <div>Gender:</div>
              <div>Country:</div>
              <div>Phone Number:</div>
            </div>
            <div className="bg-green font-light text-base">
              <div>{capitalise(user.name)}</div>
              <div>{QUALIFICATION_LABELS[user.degree]}</div>
              <div>{GENDER_LABELS[user.gender]}</div>
              <div>{user.country}</div>
              <div>{user.phoneNumber}</div>
            </div>
          </div>
          <div>
            <div className="text-davyGrey font-medium text-lg mt-10 mb-2">
              Family Details
            </div>
            <ol>
              {user.people.map((person, index) => (
                <div
                  key={`${person.firstName}_${person.age}_${person.gender}`}
                  className="flex gap-x-2 items-start"
                >
                  <div>{`${index + 1})`}</div>
                  <li className="mb-4">
                    <div className="flex gap-x-5">
                      <div className="font-medium text-base">
                        <div>Name:</div>
                        <div>Gender:</div>
                        <div>Age:</div>
                      </div>
                      <div className="bg-green font-light text-base">
                        <div>
                          {capitalise(person.firstName) +
                            " " +
                            capitalise(person.lastName)}
                        </div>
                        <div>{GENDER_LABELS[person.gender]}</div>
                        <div>{person.age}</div>
                      </div>
                    </div>
                  </li>
                </div>
              ))}
            </ol>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserDetail;

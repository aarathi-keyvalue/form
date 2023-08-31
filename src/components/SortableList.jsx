import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";

import { routes } from "../routes/routes";
import { capitalise } from "../utils/generalUtils";
import { GENDER_LABELS, QUALIFICATION_LABELS } from "../constants/form";
import {
  CrossIcon,
  DeleteLightIcon,
  EditLightIcon,
  TickIcon,
} from "../assets/icons";
import { updateUser } from "../store/form";

const SortableList = ({ listItems, editUser, deleteUser, disableUser }) => {
  const [items, setItems] = useState(listItems);
  const [draggedItem, setDraggedItem] = useState(null);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    setItems(listItems);
  }, [listItems]);

  const fontStyle = "font-light";
  const cellStyle = "w-1/6";

  const handleDragStart = (e, index) => {
    setDraggedItem(index);
    e.dataTransfer.effectAllowed = "move";
  };

  const handleDragOver = (e, index) => {
    const newItems = [...items];
    const draggedItemContent = newItems[draggedItem];
    newItems.splice(draggedItem, 1);
    newItems.splice(index, 0, draggedItemContent);
    setItems(newItems);
    dispatch(updateUser(newItems));
    setDraggedItem(index);
  };

  return (
    <ul className="mt-5 w-full flex flex-col gap-y-5">
      {items.map((user, index) => {
        console.log("file in list", user.image);
        return (
          <div
            key={user.createdAt}
            className={`flex items-center gap-x-5 px-5 py-4 rounded-md shadow-md ${
              user.isActive ? "hover:scale-[99%] cursor-pointer bg-white" : ""
            }`}
            onDragStart={(e) => handleDragStart(e, index)}
            onDragOver={(e) => handleDragOver(e, index)}
            onClick={() => {
              if (user.isActive) {
                navigate(`${routes.USERS}/${user.createdAt}`);
              }
            }}
            draggable
          >
            <div className={`flex gap-x-3 items-center ${cellStyle} `}>
              <div className="w-12 h-12 rounded-full bg-white">
                <img
                  src={user.image}
                  alt="profile"
                  className="object-contain w-full h-full rounded-full"
                />
              </div>
              <div
                className={`flex gap-x-1 ${fontStyle} ${
                  user.isActive ? "text-black" : "text-comet"
                }`}
              >
                <div>{`#${index + 1}`}</div>
                <div>{capitalise(user.name)}</div>
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
              className={`${fontStyle} ${cellStyle}  ${
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
            <div className={`${cellStyle}  flex items-center`}>
              <div
                className={`p-3 ${user.isActive ? "cursor-pointer" : ""}`}
                onClick={(e) => editUser(e, user.createdAt, user.isActive)}
              >
                <EditLightIcon width={20} height={20} />
              </div>
              <div
                className={`p-3 ${user.isActive ? "cursor-pointer" : ""}`}
                onClick={(e) => deleteUser(e, user.createdAt, user.isActive)}
              >
                <DeleteLightIcon width={18} height={18} />
              </div>
              <div
                className="p-3 cursor-pointer"
                onClick={(e) => disableUser(e, user.createdAt)}
              >
                {user.isActive ? (
                  <TickIcon height={18} width={18} />
                ) : (
                  <CrossIcon height={16} width={16} />
                )}
              </div>
            </div>
          </div>
        );
      })}
    </ul>
  );
};

export default SortableList;

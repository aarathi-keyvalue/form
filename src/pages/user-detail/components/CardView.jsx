import { useNavigate } from "react-router-dom";

import {
  CrossIcon,
  DeleteLightIcon,
  EditLightIcon,
  TickIcon,
} from "../../../assets/icons";
import { GENDER_LABELS, QUALIFICATION_LABELS } from "../../../constants/form";
import { capitalise } from "../../../utils/generalUtils";
import { routes } from "../../../routes/routes";

const CardView = (props) => {
  const { cardItems, onEditClick, onDeleteClick, onDisableClick } = props;

  const navigate = useNavigate();

  const valueStyle = "font-light text-sm";
  const attributeStyle = "font-normal text-sm";
  const fieldStyle = "flex justify-between gap-x-1";

  return (
    <div className="flex flex-col gap-y-4 sm:hidden">
      {cardItems.map((cardItem) => (
        <div
          key={cardItem.createdAt}
          className={`w-full border rounded-md shadow-md py-3 px-5 flex flex-col ${
            cardItem.isActive ? "bg-white" : ""
          }`}
          onClick={() => {
            if (cardItem.isActive)
              navigate(`${routes.USERS}/${cardItem.createdAt}`);
          }}
        >
          <div className="w-full flex justify-center">
            <div className="w-14 h-14 flex rounded-full border">
              <img
                src={cardItem.image}
                alt=""
                className="w-full h-full object-contain rounded-full"
              />
            </div>
          </div>
          <div className="flex flex-col gap-y-1 mt-3">
            <div className={fieldStyle}>
              <div className={attributeStyle}>Name</div>
              <div className={valueStyle}>{capitalise(cardItem.name)}</div>
            </div>
            <div className={fieldStyle}>
              <div className={attributeStyle}>Qualification</div>
              <div className={valueStyle}>
                {QUALIFICATION_LABELS[cardItem.degree]}
              </div>
            </div>
            <div className={fieldStyle}>
              <div className={attributeStyle}>Gender</div>
              <div className={valueStyle}>{GENDER_LABELS[cardItem.gender]}</div>
            </div>
            <div className={fieldStyle}>
              <div className={attributeStyle}>Country</div>
              <div className={valueStyle}>{cardItem.country}</div>
            </div>
            <div className={fieldStyle}>
              <div className={attributeStyle}>Phone Number</div>
              <div className={valueStyle}>{cardItem.phoneNumber}</div>
            </div>
            <div className={fieldStyle}>
              <div className={attributeStyle}>Actions</div>
              <div className="flex gap-x-2">
                <EditLightIcon
                  onClick={(e) =>
                    onEditClick(e, cardItem.createdAt, cardItem.isActive)
                  }
                />
                <DeleteLightIcon
                  onClick={(e) =>
                    onDeleteClick(e, cardItem.createdAt, cardItem.isActive)
                  }
                />
                <div onClick={(e) => onDisableClick(e, cardItem.createdAt)}>
                  {cardItem.isActive ? (
                    <TickIcon height={13} width={13} />
                  ) : (
                    <CrossIcon height={12} width={12} />
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default CardView;

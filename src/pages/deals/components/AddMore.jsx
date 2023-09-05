import { PlusSolidIcon } from "../../../assets/icons";
import { COLORS } from "../../../constants/colors";

const AddMore = (props) => {
  const { text, onClick } = props;
  return (
    <div
      className="flex gap-x-2 border py-1 px-2 w-fit border-primaryColor rounded-[3px] cursor-pointer items-center"
      onClick={onClick}
    >
      <div className="bg-primaryColor w-fit h-fit p-[2px]">
        <PlusSolidIcon fill={COLORS.WHITE} className="w-3 h-3" />
      </div>
      <div className="text-xs text-primaryColor">{text}</div>
    </div>
  );
};

export default AddMore;

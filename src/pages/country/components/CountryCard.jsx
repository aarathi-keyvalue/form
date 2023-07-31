import { RightArrowIcon } from "../../../assets/icons";
import { COLORS } from "../../../constants/colors";

const CountryCard = (props) => {
  const { flag, name, population, region, capital } = props;
  return (
    <div className="w-full border flex flex-col items-center bg-white rounded-md shadow-md">
      <div className="w-full flex justify-center items-center rounded-t-md sm:h-[180px]">
        <img src={flag} alt={name} className="w-full h-full object-cover rounded-t-md" />
      </div>
      <div className="relative flex flex-col pt-4 px-5 pb-16 items-start w-full">
        <div className="font-semibold text-base">{name}</div>
        <div className="mt-3 flex gap-x-2">
          <div className="font-medium text-sm">Population:</div>
          <div className="font-normal text-sm">{population}</div>
        </div>
        <div className="flex gap-x-2">
          <div className="font-medium text-sm">Region:</div>
          <div className="font-normal text-sm">{region}</div>
        </div>
        <div className="flex gap-x-2">
          <div className="font-medium text-sm">Capital:</div>
          <div className="font-normal text-sm">{capital}</div>
        </div>
        <RightArrowIcon
          className="absolute bottom-5 right-5 h-5 w-5"
          stroke={COLORS.HARP}
          fill={COLORS.HARP}
        />
      </div>
    </div>
  );
};

export default CountryCard;

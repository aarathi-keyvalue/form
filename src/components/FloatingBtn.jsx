import { PlusIcon } from "../assets/icons";

const FloatingBtn = (props) => {
  const { className, onClick } = props;
  return (
    <div className={`cursor-pointer ${className}`} onClick={onClick}>
      <PlusIcon height={35} width={35} />
    </div>
  );
};

export default FloatingBtn;

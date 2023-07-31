const TopBar = (props) => {
  const { headerText } = props;
  return (
    <div className="w-full px-10 py-8 bg-white border-b-2">{headerText}</div>
  );
};

export default TopBar;

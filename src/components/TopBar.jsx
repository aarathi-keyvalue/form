const TopBar = (props) => {
  const { headerText } = props;
  return (
    <div className="w-full px-10 py-8 bg-white text-lg font-medium border-b">{headerText}</div>
  );
};

export default TopBar;

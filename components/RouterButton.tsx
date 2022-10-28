import Router from "next/router";

interface props {
  onClickTo: string;
  displayText: string;
  noRedirect?: boolean;
}

const RouterButton: React.FC<props> = ({
  onClickTo,
  displayText,
  noRedirect,
}) => {
  return (
    <button
      className="font-bold border-2 border-shikamaru-green-500 px-10  py-1 rounded-full"
      onClick={() => {
        if (!noRedirect) Router.push({ pathname: onClickTo });
      }}
    >
      {displayText}
    </button>
  );
};

export default RouterButton;

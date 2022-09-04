import Link from "next/link";

interface props {
  displayText: string;
  onClickTo: string;
}

const RouterLink: React.FC<props> = ({ onClickTo, displayText }) => {
  return (
    <Link href={onClickTo}>
      <p className="underline text-xs hover:cursor-pointer">{displayText}</p>
    </Link>
  );
};

export default RouterLink;

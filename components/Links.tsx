import Link from "next/link";

const Links: React.FC = () => {
  return (
    <div className="flex gap-1 underline mb-1 text-xs sm:text-base">
      <Link href="/api">api documentation</Link>|
      <a href="https://github.com/lucidmach/kagemane" target="_">
        source code
      </a>
      |
      <a
        target="_"
        href="https://www.notion.so/lucidmach/KageMane-0e7013668e0c45eab53225d5a972c40b"
      >
        project documentation
      </a>
    </div>
  );
};

export default Links;

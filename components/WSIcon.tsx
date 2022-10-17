import Router from "next/router";
import { useRouter } from "next/router";
import { useState } from "react";

const WSIcon: React.FC = () => {
  const router = useRouter();
  const { botid } = router.query;

  const [isHover, setHover] = useState<boolean>(false);

  return (
    <div className="absolute left-4 top-3 flex gap-2 items-center">
      <div
        className="border-4 p-2 w-fit rounded-full border-shikamaru-green-900  hover:cursor-pointer"
        onMouseEnter={() => setHover(true)}
        onMouseLeave={() => setHover(false)}
        onClick={() => Router.push(`/debug/${botid}`)}
      >
        <svg
          fill="#31601e"
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
        >
          <path d="M17.033 6.966c.584.583.584 1.529 0 2.112l-7.955 7.956c-.583.583-1.529.583-2.112 0-.583-.583-.583-1.529 0-2.112l7.956-7.956c.582-.583 1.528-.583 2.111 0zm-9.138 13.386c-1.171 1.171-3.076 1.171-4.248 0-1.171-1.171-1.171-3.077 0-4.248l5.639-5.632c-1.892-.459-3.971.05-5.449 1.528l-2.147 2.147c-2.254 2.254-2.254 5.909 0 8.163 2.254 2.254 5.909 2.254 8.163 0l2.147-2.148c1.477-1.477 1.986-3.556 1.527-5.448l-5.632 5.638zm6.251-18.662l-2.146 2.148c-1.478 1.478-1.99 3.553-1.53 5.445l5.634-5.635c1.172-1.171 3.077-1.171 4.248 0 1.172 1.171 1.172 3.077 0 4.248l-5.635 5.635c1.893.459 3.968-.053 5.445-1.53l2.146-2.147c2.254-2.254 2.254-5.908 0-8.163-2.253-2.254-5.908-2.254-8.162-.001z" />
        </svg>
      </div>
      <div className={`opacity-${isHover ? 100 : 0}`}>
        debug websocket connection
      </div>
    </div>
  );
};

export default WSIcon;

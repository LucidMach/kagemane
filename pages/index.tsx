import type { NextPage } from "next";
import Image from "next/image";
import Link from "next/link";

const Home: NextPage = () => {
  return (
    <div className="h-full flex justify-center items-center flex-col">
      <Image src={"/logo.png"} alt="nara clan logo" width={500} height={500} />
      <h1 className="text-2xl font-mono italic text-green-800">KageMane</h1>
      <Link href="/api">
        <p className="underline text-green-800 cursor-pointer">
          web UI under-construction, check /api instead
        </p>
      </Link>
    </div>
  );
};

export default Home;

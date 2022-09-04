import type { NextPage } from "next";
import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import RouterButton from "../components/RouterButton";
import RouterLink from "../components/RouterLink";

const Home: NextPage = () => (
  <>
    <Head>
      <title>Home | KageMane</title>
    </Head>
    <div className="h-full flex justify-between items-center flex-col text-shikamaru-green-500">
      <div className="bg-shikamaru-green-100 text-shikamaru-green-900 w-full text-center py-1">
        this project is currently in <strong>BETA</strong> mode
      </div>
      <div className="flex flex-col items-center">
        <Image
          src={"/logo.png"}
          alt="nara clan logo"
          width={350}
          height={350}
        />
        <h1 className="text-3xl font-mono italic">KageMane</h1>
      </div>
      <div className="flex flex-col items-center">
        <RouterButton
          onClickTo="/connect-to-bot"
          displayText="Connect to Bot"
        />
        <RouterLink
          onClickTo="/create-new-bot"
          displayText="or create a new bot"
        />
      </div>
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
    </div>
  </>
);

export default Home;

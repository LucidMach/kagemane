import type { NextPage } from "next";
import Head from "next/head";
import Image from "next/image";
import Links from "../components/Links";
import RouterButton from "../components/RouterButton";
import Status from "../components/Status";

const Home: NextPage = () => (
  <>
    <Head>
      <title>Home | KageMane</title>
    </Head>
    <div className="h-full flex justify-between items-center flex-col text-shikamaru-green-500">
      <Status />
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
        {/* <RouterLink
          onClickTo="/create-new-bot"
          displayText="or create a new bot"
        /> */}
        <a
          className="underline text-sm"
          href="https://github.com/LucidMach/kagemane/tree/master/hardware"
          target="_"
        >
          or create a new bot
        </a>
      </div>
      <Links />
    </div>
  </>
);

export default Home;

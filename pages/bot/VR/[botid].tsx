import type { NextPage } from "next";
import Head from "next/head";
import Image from "next/image";
import Links from "../../../components/Links";
import Status from "../../../components/Status";

const VR: NextPage = () => (
  <>
    <Head>
      <title>Home | KageMane</title>
    </Head>
    <div className="h-full flex justify-between items-center flex-col text-shikamaru-green-500">
      <Status />
      <div className="flex flex-col items-center">
        [this bot has an VR application...]
        <Image
          src={"/logo.png"}
          alt="nara clan logo"
          width={150}
          height={150}
        />
        <a
          className="underline text-sm text-center"
          href="https://github.com/LucidMach/kagemane/tree/master/hardware"
          target="_"
        >
          click to download and install
        </a>
      </div>
      <Links />
    </div>
  </>
);

export default VR;

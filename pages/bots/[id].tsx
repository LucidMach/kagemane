import { NextPage } from "next";
import Head from "next/head";
import { useRouter } from "next/router";
import { useEffect } from "react";
import Links from "../../components/Links";
import Status from "../../components/Status";

const Bots: NextPage = () => {
  const router = useRouter();
  const { id } = router.query;

  useEffect(() => {}, []);

  return (
    <>
      <Head>
        <title>UI</title>
      </Head>
      <div className="h-full flex justify-between items-center flex-col bg-shikamaru-green-100 text-shikamaru-green-900">
        <Status />
        <div className="font-bold">id: {id}</div>
        <Links />
      </div>
    </>
  );
};

export default Bots;

import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { NextPage } from "next";
import Head from "next/head";
import { useRouter } from "next/router";
import Links from "../../../components/Links";
import Status from "../../../components/Status";
import WSIcon from "../../../components/WSIcon";

const Sensor: NextPage = () => {
  const router = useRouter();
  const { botid } = router.query;

  const { data, isLoading } = useQuery(["bot", botid], async ({ queryKey }) => {
    const res = await axios.post("/api/getWSurl", { id: botid });
    return res.data.data;
  });

  return (
    <>
      <Head>
        <title>UI</title>
      </Head>
      <div className="h-full flex justify-between items-center flex-col bg-shikamaru-green-100 text-shikamaru-green-900">
        <WSIcon />
        <Status />
        <div className="lgt text-7xl flex flex-col gap-4 font-bold items-center">
          <div className={`led led--false`}></div>
          <div className="italic text-base">DIGITAL VALUE</div>
        </div>
        <Links />
      </div>
    </>
  );
};

export default Sensor;

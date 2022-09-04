import { NextPage } from "next";
import Head from "next/head";
import { useRouter } from "next/router";
import Links from "../../components/Links";
import Status from "../../components/Status";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";

const Bots: NextPage = () => {
  const router = useRouter();
  const { id } = router.query;

  const { data, isLoading } = useQuery(["bot", id], async ({ queryKey }) => {
    // const res = await fetch("/api/getIP", {
    //   headers: {
    //     Accept: "application/json",
    //     "Content-Type": "application/json",
    //   },
    //   method: "POST",
    //   body: JSON.stringify({ id }),
    // });
    // console.log(res);

    const res = await axios.post("/api/getIP", {
      id,
    });

    return res.data.data;
  });

  return (
    <>
      <Head>
        <title>UI</title>
      </Head>
      <div className="h-full flex justify-between items-center flex-col bg-shikamaru-green-100 text-shikamaru-green-900">
        <Status />
        <div className="flex flex-col items-center">
          <strong>bot: {id}</strong>
          {isLoading ? (
            <div>loading...</div>
          ) : (
            <div>{JSON.stringify(data)}</div>
          )}
        </div>
        <Links />
      </div>
    </>
  );
};

export default Bots;

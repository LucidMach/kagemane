import { useQuery } from "@tanstack/react-query";
import axios from "axios";

import Head from "next/head";
import { NextPage } from "next";
import Router from "next/router";
import { useRouter } from "next/router";

import {
  ChangeEventHandler,
  FormEventHandler,
  useEffect,
  useState,
} from "react";

import Links from "../../../components/Links";
import RouterButton from "../../../components/RouterButton";
import Status from "../../../components/Status";

const Settings: NextPage = () => {
  const { botid } = useRouter().query;

  const { data, isLoading } = useQuery(["bot", botid], async ({ queryKey }) => {
    const res = await axios.post("/api/getBotProps", { id: botid });

    return res.data.data;
  });

  const [botPort, setBotPort] = useState(0);
  const [botWSendpoint, setBotWSendpoint] = useState("/");
  const [botSecure, setBotSecure] = useState(false);

  useEffect(() => {
    if (data) {
      setBotPort(data.port);
      setBotSecure(data.secure);
      setBotWSendpoint(data.endpoint);
    }
  }, [data]);

  const handleChange: ChangeEventHandler<HTMLInputElement> = (e) => {
    if (e.currentTarget.id === "endpoint")
      setBotWSendpoint(e.currentTarget.value);
    if (e.currentTarget.id === "secure") setBotSecure(e.currentTarget.checked);
    if (e.currentTarget.id === "port")
      setBotPort(parseInt(e.currentTarget.value));
  };

  const handleSubmit: FormEventHandler<HTMLFormElement> = async (e) => {
    e.preventDefault();

    const res = await axios.post("/api/updateBotProps", {
      id: botid,
      endpoint: botWSendpoint,
      port: botPort,
      secure: botSecure,
    });

    Router.push("/bot/" + botid);
  };

  return (
    <>
      <Head>
        <title>{"Settings | " + botid}</title>
      </Head>
      <div className="h-full flex justify-between items-center flex-col text-shikamaru-green-900">
        <Status />
        <form
          className="flex flex-col items-center gap-5 w-1/2 min-w-[360px] p-5 shadow-sm shadow-shikamaru-green-500"
          onSubmit={handleSubmit}
        >
          <h1 className="text-3xl font-bold self-start">{`bot/${botid}`}</h1>
          <h3 className="font-semibold self-start">port:</h3>
          <input
            id="port"
            type="number"
            value={botPort}
            className="px-3 py-2 border shadow-sm border-shikamaru-green-500 placeholder-shikamaru-green-500 focus:outline-none focus:border-shikamaru-green-900 focus:ring-shikamaru-green-900 block w-full rounded-md sm:text-sm focus:ring-1"
            placeholder="choose port number"
            onChange={handleChange}
          />
          <div className="self-start flex items-center gap-5">
            <h3 className="font-semibold self-start">use secure protocols:</h3>
            <input
              type="checkbox"
              checked={botSecure === true ? true : false}
              id="secure"
              onChange={handleChange}
            />
          </div>
          <h3 className="font-semibold self-start">ws endpoint:</h3>
          <input
            id="endpoint"
            type="text"
            autoComplete="off"
            value={botWSendpoint}
            className="mb-3 px-3 py-2 border shadow-sm border-shikamaru-green-500 placeholder-shikamaru-green-500 focus:outline-none focus:border-shikamaru-green-900 focus:ring-shikamaru-green-900 block w-full rounded-md sm:text-sm focus:ring-1"
            placeholder="choose endpoint for websocket connection"
            onChange={handleChange}
          />

          <div className="flex gap-5">
            <RouterButton displayText="BACK" onClickTo={`/bot/${botid}`} />
            <RouterButton
              displayText="UPDATE"
              onClickTo={`/bot/${botid}`}
              noRedirect={true}
            />
          </div>
        </form>
        <Links />
      </div>
    </>
  );
};

export default Settings;

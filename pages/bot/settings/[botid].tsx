import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { NextPage } from "next";
import Head from "next/head";
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

// interface botPropTypes {
//   id: string;
//   ip: string;
//   port: number;
//   secure: boolean;
//   endpoint: string;
// }

const Settings: NextPage = () => {
  const router = useRouter();
  const { botid } = router.query;

  const { data, isLoading } = useQuery(["bot", botid], async ({ queryKey }) => {
    const res = await axios.post("/api/getBotProps", { id: botid });

    return res.data.data;
  });

  const [botProps, setBotProps] = useState<{
    endpoint: string;
    port: any;
    secure: boolean;
  }>({
    endpoint: "",
    port: 0,
    secure: false,
  });

  useEffect(() => {
    if (data)
      setBotProps({
        endpoint: data.endpoint,
        port: data.port,
        secure: data.secure,
      });
  }, [data]);

  const handleChange: ChangeEventHandler<HTMLInputElement> = (e) => {
    if (e.currentTarget.id === "endpoint")
      setBotProps({
        secure: botProps.secure,
        endpoint: e.target.value,
        port: botProps.secure,
      });
    if (e.currentTarget.id === "secure")
      setBotProps({
        endpoint: botProps.endpoint,
        secure: e.target.checked,
        port: botProps.port,
      });
    if (e.currentTarget.id === "port")
      setBotProps({
        endpoint: botProps.endpoint,
        secure: botProps.secure,
        port: e.target.value,
      });
  };

  const handleSubmit: FormEventHandler<HTMLFormElement> = async (e) => {
    e.preventDefault();
    // console.log(botProps);
    const res = await axios.post("/api/updateBotProps", {
      id: botid,
      endpoint: botProps.endpoint,
      port: botProps.port,
      secure: botProps.secure,
    });
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
            value={botProps.port}
            className="px-3 py-2 border shadow-sm border-shikamaru-green-500 placeholder-shikamaru-green-500 focus:outline-none focus:border-shikamaru-green-900 focus:ring-shikamaru-green-900 block w-full rounded-md sm:text-sm focus:ring-1"
            placeholder="choose port number"
            onChange={handleChange}
          />
          <div className="self-start flex items-center gap-5">
            <h3 className="font-semibold self-start">use secure protocols:</h3>
            <input
              type="checkbox"
              checked={botProps.secure === true ? true : false}
              id="secure"
              onChange={handleChange}
            />
          </div>
          <h3 className="font-semibold self-start">ws endpoint:</h3>
          <input
            id="endpoint"
            type="text"
            value={botProps.endpoint}
            className="mb-3 px-3 py-2 border shadow-sm border-shikamaru-green-500 placeholder-shikamaru-green-500 focus:outline-none focus:border-shikamaru-green-900 focus:ring-shikamaru-green-900 block w-full rounded-md sm:text-sm focus:ring-1"
            placeholder="choose endpoint for websocket connection"
            onChange={handleChange}
          />
          <RouterButton
            displayText="UPDATE"
            onClickTo={`/bot/${botid}`}
            noRedirect={true}
          />
        </form>
        <Links />
      </div>
    </>
  );
};

export default Settings;

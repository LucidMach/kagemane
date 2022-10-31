import { NextPage } from "next";
import { useAtom } from "jotai";
import Head from "next/head";
import Status from "../components/Status";
import Links from "../components/Links";
import RouterButton from "../components/RouterButton";
import { ChangeEventHandler, FormEventHandler } from "react";
import { botIDAtom } from "../utils/atoms";

const ConnectToBot: NextPage = () => {
  const [botID, setBotId] = useAtom(botIDAtom);

  const handleChange: ChangeEventHandler<HTMLInputElement> = (e) => {
    setBotId(e.target.value);
  };

  const handleSubmit: FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault();
  };

  return (
    <>
      <Head>
        <title>Connect to Bot</title>
      </Head>
      <div className="h-full flex justify-between items-center flex-col text-shikamaru-green-900 overflow-hidden">
        <Status />
        <form
          className="flex flex-col items-center gap-5 w-1/2 min-w-[360px] p-5 shadow-sm shadow-shikamaru-green-500"
          onSubmit={handleSubmit}
        >
          <h1 className="text-3xl font-bold self-start">Enter Bot ID</h1>
          <input
            type="text"
            className="mb-3 px-3 py-2 border shadow-sm border-shikamaru-green-500 placeholder-shikamaru-green-500 focus:outline-none focus:border-shikamaru-green-900 focus:ring-shikamaru-green-900 block w-full rounded-md sm:text-sm focus:ring-1"
            placeholder="scan the QR code on bot to find out"
            value={botID}
            onChange={handleChange}
          />
          <RouterButton
            displayText="Connect"
            onClickTo={`/bot/debug/${botID}`}
          />
        </form>
        <Links />
      </div>
    </>
  );
};

export default ConnectToBot;

import { NextPage } from "next";
import Head from "next/head";
import { useRouter } from "next/router";
import Router from "next/router";
import Links from "../../../components/Links";
import Status from "../../../components/Status";
import ToggleSwitch from "../../../components/ToggleSwitch";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useEffect, useState, useRef } from "react";
import useWS from "../../../hooks/useWS";

const Bots: NextPage = () => {
  const [led, setLED] = useState<boolean>(false);

  const router = useRouter();
  const { botid } = router.query;

  const { data, isLoading } = useQuery(["bot", botid], async ({ queryKey }) => {
    const res = await axios.post("/api/getBotProps", { id: botid });
    return res.data.data;
  });

  const botQueryRender = () => {
    return isLoading ? (
      <div>fetching latest IP...</div>
    ) : (
      <>
        <div>{`IP address: [${data.ip}]`}</div>
        <div>{`SECURE: [${data.secure}]`}</div>
      </>
    );
  };

  //////////////////////////////////////////////////////////////////////////////////////// fr arduino

  const ws = useWS(data, (e) => {
    e.data == "1" ? setLED(false) : setLED(true);
  });

  let handleClick = () => {
    setLED((prev) => !prev);
    if (ws.current) {
      ws.current.send("toggle");
    }
  };

  return (
    <>
      <Head>
        <title>UI</title>
      </Head>
      <div className="h-full flex justify-between items-center flex-col bg-shikamaru-green-100 text-shikamaru-green-900">
        <Status />
        <div className="flex flex-col items-center">
          <div className="lgt">
            <div className={`led led--${led}`}></div>
          </div>
          <button
            className="w-[250px] h-[250px] mb-5 bg-shikamaru-green-100 neumorphism rounded-full"
            onClick={handleClick}
          ></button>
          <strong>BotID</strong>
          {botQueryRender()}
        </div>
        <ToggleSwitch
          onClick={() => Router.push({ pathname: "/bot/" + botid })}
        />
        <Links />
      </div>
    </>
  );
};

export default Bots;

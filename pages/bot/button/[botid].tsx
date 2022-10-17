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
import WSIcon from "../../../components/WSIcon";

const Button: NextPage = () => {
  const [led, setLED] = useState<boolean>(false);

  const router = useRouter();
  const { botid } = router.query;

  const { data, isLoading } = useQuery(["bot", botid], async ({ queryKey }) => {
    const res = await axios.post("/api/getIP", { id: botid });
    return res.data.data;
  });

  //////////////////////////////////////////////////////////////////////////////////////// fr arduino

  const ws = useRef<WebSocket>();

  useEffect(() => {
    if (data) {
      let botip = data.secure ? "wss://" : "ws://";
      botip += data.ip + ":" + data.port + data.endpoint;
      console.log(botip);

      ws.current = new WebSocket(botip);

      ws.current.onopen = () => {
        console.log("Connection opened");

        if (ws.current)
          ws.current.onmessage = (e) => {
            e.data == "1" ? setLED(false) : setLED(true);
          };
      };

      ws.current.onclose = () => console.log("Connection closed");
    }
  }, [data]);

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
        <WSIcon />
        <Status />
        <div className="flex flex-col items-center">
          <div className="lgt">
            <div className={`led led--${led}`}></div>
          </div>
          <button
            className="w-[250px] h-[250px] mb-5 bg-shikamaru-green-100 neumorphism rounded-full"
            onClick={handleClick}
          ></button>
        </div>
        <Links />
      </div>
    </>
  );
};

export default Button;
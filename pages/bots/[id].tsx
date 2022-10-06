import { NextPage } from "next";
import Head from "next/head";
import { useRouter } from "next/router";
import Links from "../../components/Links";
import Status from "../../components/Status";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useEffect, useState, useRef } from "react";

const Bots: NextPage = () => {
  const [led, setLED] = useState<boolean>(false);

  const router = useRouter();
  const { id } = router.query;

  const { data, isLoading } = useQuery(["bot", id], async ({ queryKey }) => {
    const res = await axios.post("/api/getIP", { id });
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

  const ws = useRef<WebSocket>();

  useEffect(() => {
    if (data) {
      const botip = data.secure ? "wss" : "ws" + "://" + data.ip + "/socket";
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
        <Links />
      </div>
    </>
  );
};

export default Bots;

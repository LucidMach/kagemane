import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { NextPage } from "next";
import Head from "next/head";
import { useRouter } from "next/router";
import { useEffect, useRef } from "react";
import Links from "../../../components/Links";
import Slider from "../../../components/Slider";
import Status from "../../../components/Status";
import WSIcon from "../../../components/WSIcon";

const Sensor: NextPage = () => {
  const router = useRouter();
  const { botid } = router.query;

  let value = useRef(77);

  const { data, isLoading } = useQuery(["bot", botid], async ({ queryKey }) => {
    const res = await axios.post("/api/getWSurl", { id: botid });
    return res.data.data;
  });

  const ws = useRef<WebSocket>();

  useEffect(() => {
    if (data) {
      ws.current = new WebSocket(data);

      ws.current.onopen = () => {
        console.log("Connection opened");
      };

      ws.current.onmessage = (e) => {
        const msg = e.data;

        if (msg) {
          value.current = msg.value;
        }
      };

      ws.current.onclose = () => console.log("Connection closed");
    }
  }, [data]);

  return (
    <>
      <Head>
        <title>UI</title>
      </Head>
      <div className="h-full flex justify-between items-center flex-col bg-shikamaru-green-100 text-shikamaru-green-900">
        <WSIcon />
        <Status />
        <div className="flex flex-col items-center z-10">
          <div className="text-9xl">{value.current}</div>
          <div className="italic">ANALOG VALUE</div>
        </div>
        <div className="absolute top-[45%] w-full z-0">
          <Slider
            value={value.current}
            key="analog"
            max={1023}
            setValue={() => {}}
          />
        </div>
        <Links />
      </div>
    </>
  );
};

export default Sensor;

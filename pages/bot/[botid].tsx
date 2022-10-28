import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { NextPage } from "next";
import Head from "next/head";
import { useRouter } from "next/router";
import Router from "next/router";
import Links from "../../components/Links";
import Status from "../../components/Status";
import SettingsIcon from "../../components/SettingsIcon";

const buttonCSS =
  "border-shikamaru-green-900 border-2 w-2/3 p-2 rounded-sm hover:bg-shikamaru-green-900 hover:text-shikamaru-green-100";

const Bot: NextPage = () => {
  const router = useRouter();
  const { botid } = router.query;

  const { data, isLoading } = useQuery(
    ["bot", botid, "UI"],
    async ({ queryKey }) => {
      const res = await axios.post("/api/getUI", { botid });
      return res.data.data;
    }
  );

  type uitype = {
    botid: string;
    type: string;
  };

  const renderUIApps = () => {
    if (isLoading) return "...loading";

    if (data) {
      let HTML = [];

      for (let i = 0; i < data.length; ++i) {
        const ui = data[i];
        HTML.push(
          <button
            className={buttonCSS}
            key={ui.type}
            onClick={() => {
              Router.push(`/bot/${ui.type}/${botid}`);
            }}
          >
            {ui.type}
          </button>
        );
      }
      return HTML;
    }
  };

  return (
    <>
      <Head>
        <title>UI</title>
      </Head>
      <div className="h-full flex justify-between items-center flex-col bg-shikamaru-green-100 text-shikamaru-green-900">
        <Status />
        <SettingsIcon onClickTo={`/bot/settings/${botid}`} />
        <div className="flex flex-col w-full min-w-[600px] items-center gap-3">
          {renderUIApps()}
          <p className="text-sm m-3">(or)</p>
          <button className={buttonCSS + " cursor-not-allowed"}>
            create new application
          </button>
        </div>
        <Links />
      </div>
    </>
  );
};

export default Bot;

// API endpoint for UI to obtains bot's ws endpoint
import { supabase } from "../../utils/supabase";
import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { id } = req.body;

  res.status(200).json({
    data: await getIP(id),
  });
}

export const getIP = async (id: string) => {
  const { data, error } = await supabase
    .from("Bot")
    .select("ip,secure,endpoint,port")
    .eq("id", id);

  if (error) {
    console.log(error);
    return "ERROR";
  }

  if (data[0]) {
    let wsurl: string;

    wsurl = data[0].secure ? "wss://" : "ws://";
    wsurl += data[0].ip + ":" + data[0].port + data[0].endpoint;

    return wsurl;
  }
};

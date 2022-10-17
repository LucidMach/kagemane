// API endpoint to get a list of available UI configured to a bot
import { supabase } from "../../utils/supabase";
import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { botid } = req.body;

  res.status(200).json({
    data: await getUI(botid),
  });
}

export const getUI = async (botid: string) => {
  const { data, error } = await supabase
    .from("UI")
    .select("botID, type")
    .eq("botID", botid);

  return data ? data : "ERROR";
};

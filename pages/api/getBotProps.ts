// API endpoint for UI to get a bot's current properties
import { supabase } from "../../utils/supabase";
import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { id } = req.body;

  res.status(200).json({
    data: await getBotProps(id),
  });
}

export const getBotProps = async (id: string) => {
  const { data, error } = await supabase
    .from("Bot")
    .select("ip,secure,endpoint,port")
    .eq("id", id);

  return data ? data[0] : "ERROR";
};

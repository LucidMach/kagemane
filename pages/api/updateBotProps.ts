// API endpoint for bot to update bot props in DB
import { supabase } from "../../utils/supabase";
import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { id, port, secure, endpoint } = req.body;
  console.log(req.body);

  res.status(200).json({
    data: await updateBotProps(id, port, secure, endpoint),
  });
}

export const updateBotProps = async (
  id: string,
  port?: number,
  secure?: boolean,
  endpoint?: string
) => {
  const { data, error } = await supabase
    .from("Bot")
    .upsert({ id, port, secure, endpoint });
  if (error) console.log(error);

  return error ? ":( Oops \n check log in vercel" : "SUCCESS";
};

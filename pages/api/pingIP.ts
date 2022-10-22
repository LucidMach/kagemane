// API endpoint for bot to ping/update it's IP address in DB
import { supabase } from "../../utils/supabase";
import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { id, ip, port, secure, endpoint } = req.body;
  console.log(req.body);

  res.status(200).json({
    data: await pingIP(id, ip, port, secure, endpoint),
  });
}

export const pingIP = async (
  id: string,
  ip: string,
  port?: number,
  secure?: boolean,
  endpoint?: string
) => {
  const { data, error } = await supabase
    .from("Bot")
    .upsert({ id, ip, port, secure, endpoint });
  if (error) console.log(error);
  return error ? ":( Oops \n check log in vercel" : "SUCCESS";
};

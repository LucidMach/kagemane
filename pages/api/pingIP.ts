// API endpoint for bot to ping/update it's IP address in DB
import { supabase } from "../../utils/supabase";
import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { id, ip } = req.body;
  console.log(req.body);

  res.status(200).json({
    data: await pingIP(id, ip),
  });
}

export const pingIP = async (id: string, ip: string) => {
  const { data, error } = await supabase.from("Bot").upsert({ id, ip });
  if (error) console.log(error);

  return error ? ":( Oops \n check log in vercel" : "SUCCESS";
};

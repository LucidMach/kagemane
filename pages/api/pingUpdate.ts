// API endpoint for bot to ping/update it's IP address in DB
import { supabase } from "../../utils/supabase";
import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { id, ip, port } = req.body;

  res.status(200).json({
    data: pingUpdate(ip, id, port),
  });
}

export const pingUpdate = async (id: string, ip: string, port: string) => {
  const { data, error } = await supabase.from("Bot").upsert({ id, ip, port });
  return error ? ":( Oops" : "SUCCESS";
};

// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";

interface endpoints {
  [path: string]: string;
}

interface Data {
  name: string;
  endpoints: endpoints;
}

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  res.status(200).json({
    name: "LucidMach",
    endpoints: {
      "/api": "home route of api, shows all avaiable enpoints of the API",
    },
  });
}

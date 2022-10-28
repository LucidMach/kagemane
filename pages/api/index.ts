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
  res
    .status(200)
    .redirect("https://github.com/LucidMach/kagemane/tree/master/pages/api");
}

import dotenv from "dotenv";
dotenv.config({ path: ".env.local" });
import { supabase } from "../../utils/supabase";

import { pingUpdate } from "../../pages/api/pingUpdate";

test("check env variables", () => {
  expect(process.env.NEXT_PUBLIC_SUPABASE_URL).not.toBe(undefined);
  expect(process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY).not.toBe(undefined);
});

test("check pingUpdate", async () => {
  const recieved = await pingUpdate("test07", "127.0.0.1", "3000");
  expect(recieved).toBe("SUCCESS");
  const { data, error } = await supabase
    .from("Bot")
    .delete()
    .match({ id: "test07" });
  if (error) console.log(error);
});

import dotenv from "dotenv";
dotenv.config({ path: ".env.local" });

import { supabase } from "../../utils/supabase";
import { pingIP } from "../../pages/api/pingIP";
import { getIP } from "../../pages/api/getIP";

test("check env variables", () => {
  expect(process.env.NEXT_PUBLIC_SUPABASE_URL).not.toBe(undefined);
  expect(process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY).not.toBe(undefined);
});

test("check pingIP", async () => {
  expect(await pingIP("test07", "127.0.0.1", "3000")).toBe("SUCCESS");

  // clean up after test
  const { data, error } = await supabase
    .from("Bot")
    .delete()
    .match({ id: "test07" });
  if (error) console.log(error);
});

test("check getIP", async () => {
  expect(await getIP("init")).not.toBe("ERROR");
});

import dotenv from "dotenv";
dotenv.config({ path: ".env.local" });

test("check env variables", () => {
  expect(process.env.NEXT_PUBLIC_SUPABASE_URL).not.toBe(undefined);
  expect(process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY).not.toBe(undefined);
});

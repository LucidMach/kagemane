import { createClient } from "@supabase/supabase-js";

const env_fail_message = "yo! your .env.local file is probably fucked";

const supabaseURL = process.env.NEXT_PUBLIC_SUPABASE_URL
  ? process.env.NEXT_PUBLIC_SUPABASE_URL
  : env_fail_message;
const supabaseANON = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
  ? process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
  : env_fail_message;

export const supabase = createClient(supabaseURL, supabaseANON);

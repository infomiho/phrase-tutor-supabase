import { createClient } from "@supabase/supabase-js";

const supabaseUrl = "https://vwqxoubutxhqdebhnwlg.supabase.co";
const supabaseKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InZ3cXhvdWJ1dHhocWRlYmhud2xnIiwicm9sZSI6ImFub24iLCJpYXQiOjE2Njg0MDUxNDAsImV4cCI6MTk4Mzk4MTE0MH0.FjTKlA7UM2XMzpff9jldMuHDy4HARvUwBe3RAU8Z6Mk";
export const supabase = createClient(supabaseUrl, supabaseKey);

import { createClient } from "@supabase/supabase-js";

export const supabaseUrl = "https://mattovsplehupgolzfnn.supabase.co";
// const supabaseKey = process.env.SUPABASE_KEY;
const supabaseKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im1hdHRvdnNwbGVodXBnb2x6Zm5uIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDIxNDY2OTEsImV4cCI6MjA1NzcyMjY5MX0.5deu0C2LOFGow3UL-GQ4gp4k0qePbmf-HNp8kHAadyA";
const supabase = createClient(supabaseUrl, supabaseKey);

export default supabase;

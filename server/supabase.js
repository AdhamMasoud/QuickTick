import { createClient } from '@supabase/supabase-js';
const supabaseUrl = process.env.SUPABASE_URL;
const supabaseAnonKey = process.env.SUPABASE_KEY;

export const supabase = createClient(
  "https://ognqavakgcqmdugiifaw.supabase.co",
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im9nbnFhdmFrZ2NxbWR1Z2lpZmF3Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDgwMDE2MTAsImV4cCI6MjA2MzU3NzYxMH0.ajmaALcqjBMYeTUPt-QR0HmOVh4XxVYaMjx3g0MozYA"
);
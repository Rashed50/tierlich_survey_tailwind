import { createClient  } from "@supabase/supabase-js";

const supabaseUrl = process.env.TIERLICH_PUBLIC_SUPABASE_URL  || 'https://zokujhnfhgcdlfhbspic.supabase.co'
const supabaseAnonKey = process.env.TIERLICH_PUBLIC_SUPABASE_ANON_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inpva3VqaG5maGdjZGxmaGJzcGljIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTI0MzQ0MjAsImV4cCI6MjA2ODAxMDQyMH0.VROqwLrLW9pIEgyAja-uCySLXTPgTRQdjDp2EwQ2xqI'

const supabase = createClient(supabaseUrl,supabaseAnonKey)
export default supabase; 

// export  const supabase = createClient(supabaseUrl, supabaseAnonKey, {
//   auth: {
//     persistSession: true,
//     detectSessionInUrl: false,
//   },
// });
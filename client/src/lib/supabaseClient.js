import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://gblwlxkmojfpdrkhqbmt.supabase.co'
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImdibHdseGttb2pmcGRya2hxYm10Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDQxMTUzOTcsImV4cCI6MjA1OTY5MTM5N30._F-KCBDT3lvvJi8yJbFLQ0EcAGZd5B1ACDIDhSY1UX0'

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

import { createClient } from '@supabase/Supabase-js';
import dotenv from 'dotenv';

dotenv.config();

const supabaseUrl = process.env.SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_KEY;

if (!supabaseUrl || !supabaseKey) {
    throw new Error('Les variables SUPABASE_URL et SUPABASE_KEY sont requises.');
  }
  

export const supabase = createClient(supabaseUrl, supabaseKey);

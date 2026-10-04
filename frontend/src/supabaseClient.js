import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://mrjtxcuolmnecttamvpl.supabase.co';
const supabaseAnonKey = 'sb_publishable_3T8-48aX3vu0Fz2D3feueA_Pw37K38N';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
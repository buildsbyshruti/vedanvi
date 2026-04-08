/**
 * db.js — Config
 * Supabase database client configuration.
 * Reads credentials from environment variables (.env file).
 */

// Uncomment when supabase package is installed:
const { createClient } = require('@supabase/supabase-js');

const supabaseUrl  = process.env.SUPABASE_URL  || '';
const supabaseKey  = process.env.SUPABASE_KEY  || '';

// Use dummy client if URL/KEY not provided yet (prevent crash if user hasn't put credentials)
let supabase = null;
if (supabaseUrl && supabaseKey) {
    supabase = createClient(supabaseUrl, supabaseKey);
}

module.exports = {
    supabaseUrl,
    supabaseKey,
    supabase,
};

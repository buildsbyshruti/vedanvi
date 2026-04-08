/**
 * User.js — Model
 * Defines User schema and authentication helpers.
 * Designed to integrate with Supabase Auth or a custom DB.
 */

const User = {
    /**
     * Find a user by email (placeholder — swap with DB query)
     */
    findByEmail: async (email) => {
        // TODO: Replace with Supabase query
        // const { data, error } = await supabase.from('users').select('*').eq('email', email).single();
        return null;
    },

    /**
     * Create a new user record
     */
    create: async ({ name, email, passwordHash }) => {
        // TODO: Replace with Supabase insert
        // const { data, error } = await supabase.from('users').insert([{ name, email, password_hash: passwordHash }]);
        return { id: Date.now(), name, email };
    },

    /**
     * Validate password (bcrypt comparison placeholder)
     */
    validatePassword: (inputPassword, storedHash) => {
        // TODO: Use bcrypt.compare(inputPassword, storedHash)
        return inputPassword === storedHash;
    },
};

module.exports = User;

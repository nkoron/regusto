// pages/api/actions.js
import { createClient } from "../lib/server";
import { encodedRedirect } from "../lib/Utils";

export default async function handler(req, res) {
    if (req.method !== 'POST') {
        res.status(405).json({ error: 'Method not allowed' });
        return;
    }

    const { email, password } = req.body;
    const origin = req.headers.origin; // Use req.headers.origin directly

    const supabase = createClient();

    if (!email || !password) {
        res.status(400).json({ error: "Email and password are required" });
        return;
    }

    const { error } = await supabase.auth.signUp({
        email,
        password,
        options: {
            emailRedirectTo: `${origin}/auth/callback`,
        },
    });

    if (error) {
        console.error(error.code + " " + error.message);
        res.status(400).json({ error: error.message });
    } else {
        res.status(200).json({
            redirect: encodedRedirect(
                "success",
                "/sign-up",
                "Thanks for signing up! Please check your email for a verification link."
            ),
        });
    }
}
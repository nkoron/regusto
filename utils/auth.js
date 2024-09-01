import { useState, useEffect } from 'react';
import { createClient } from "utils/supabase/server";
import { redirect } from "next/navigation";
import { User } from '@supabase/supabase-js'; // Import User type from Supabase

export function useSession() {
    const [session, setSession] = useState(null); // Update state type
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchSession = async () => {
            const supabase = createClient();

            const {
                data: { user },
            } = await supabase.auth.getUser();

            if (!user) {
                redirect("/sign-in");
                setLoading(false);
                return;
            }

            setSession(user); // Set user to session state
            setLoading(false);
        };

        fetchSession();
    }, []);

    return { session, loading };
}
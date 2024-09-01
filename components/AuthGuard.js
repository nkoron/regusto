"use client";
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import {createClient} from "../utils/supabase/client";

const AuthGuard = ({ children }) => {
    const [loading, setLoading] = useState(true);
    const [authenticated, setAuthenticated] = useState(false);
    const router = useRouter();
    const supabase = createClient();

    useEffect(() => {
        const checkUser = async () => {
            const { data: { session } } = await supabase.auth.getSession();
            if (session) {
                setAuthenticated(true);
            } else {
                await router.push('/login');
            }
            setLoading(false);
        };

        checkUser();
    }, [router]);

    if (loading) {
        return <p>Loading...</p>; // Puedes mostrar un spinner o un mensaje de carga
    }

    return authenticated ? children : null;
};

export default AuthGuard;
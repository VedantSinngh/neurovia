"use client";
import { useEffect } from "react";
import { supabase } from "@/lib/supabase";
import { useRouter } from "next/navigation";

export default function Logout() {
    const router = useRouter();

    useEffect(() => {
        const handleLogout = async () => {
            await supabase.auth.signOut();
            router.push("/login");
        };
        handleLogout();
    }, [router]);

    return (
        <div className="min-h-screen bg-gradient-to-b from-black to-gray-900 text-white flex items-center justify-center">
            <p>Logging out...</p>
        </div>
    );
}
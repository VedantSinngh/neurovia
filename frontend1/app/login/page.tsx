"use client";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase";
import { useState } from "react";

export default function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const router = useRouter();

    const handleLogin = async () => {
        const { error } = await supabase.auth.signInWithPassword({ email, password });
        if (error) alert(error.message);
        else router.push("/");
    };

    const handleGoogleLogin = async () => {
        await supabase.auth.signInWithOAuth({
            provider: "google",
            options: { redirectTo: `${window.location.origin}/dashboard` },
        });
    };

    return (
        <div className="min-h-screen bg-gradient-to-b from-black to-gray-900 text-white flex items-center justify-center">
            <div className="bg-gray-800 p-8 rounded-lg w-96">
                <h2 className="text-xl font-bold text-center mb-4">Login</h2>
                <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} className="w-full px-4 py-2 mb-4 border rounded-md text-black" />
                <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} className="w-full px-4 py-2 mb-4 border rounded-md text-black" />
                <button onClick={handleLogin} className="w-full px-4 py-2 bg-blue-600 text-white rounded-md mb-4">Login</button>
                <button onClick={handleGoogleLogin} className="w-full px-4 py-2 bg-red-600 text-white rounded-md">Login with Google</button>
            </div>
        </div>
    );
}
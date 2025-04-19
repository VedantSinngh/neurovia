"use client";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase";
import { useState } from "react";

export default function Signup() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const router = useRouter();

    const handleSignup = async () => {
        const { error } = await supabase.auth.signUp({ email, password });
        if (error) alert(error.message);
        else router.push("/dashboard");
    };

    const handleGoogleSignup = async () => {
        await supabase.auth.signInWithOAuth({
            provider: "google",
            options: { redirectTo: `${window.location.origin}/dashboard` },
        });
    };

    return (
        <div className="min-h-screen bg-gradient-to-b from-black to-gray-900 text-white flex items-center justify-center">
            <div className="bg-gray-800 p-8 rounded-lg w-96">
                <h2 className="text-xl font-bold text-center mb-4">Sign Up</h2>
                <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} className="w-full px-4 py-2 mb-4 border rounded-md text-black" />
                <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} className="w-full px-4 py-2 mb-4 border rounded-md text-black" />
                <button onClick={handleSignup} className="w-full px-4 py-2 bg-gray-600 text-white rounded-md mb-4">Sign Up</button>
                <button onClick={handleGoogleSignup} className="w-full px-4 py-2 bg-red-600 text-white rounded-md">Sign Up with Google</button>
            </div>
        </div>
    );
}
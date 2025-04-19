"use client";

import { useEffect, useState } from "react";
import { useRouter, usePathname } from "next/navigation";
import { Sidebar, SidebarBody, SidebarLink } from "@/components/ui/sidebar";
import { Navbar } from "@/components/ui/navbar";
import { IconHome, IconUser, IconSettings } from "@tabler/icons-react";
import { supabase } from "@/lib/supabase";

const sidebarItems = [
    { label: "Home", icon: <IconHome />, href: "/" },
    { label: "Profile", icon: <IconUser />, href: "/profile" },
    { label: "Settings", icon: <IconSettings />, href: "/settings" },
];

export default function RootLayoutClient({ children }: { children: React.ReactNode }) {
    const [user, setUser] = useState<any>(null);
    const [loading, setLoading] = useState(true);
    const router = useRouter();
    const pathname = usePathname();

    useEffect(() => {
        const checkUser = async () => {
            const { data: { session } } = await supabase.auth.getSession();
            setUser(session?.user ?? null);
            setLoading(false);

            const publicRoutes = ["/", "/login", "/signup"];
            if (!session && !publicRoutes.includes(pathname)) {
                router.push("/login");
            }
        };

        checkUser();

        const { data: authListener } = supabase.auth.onAuthStateChange((event, session) => {
            setUser(session?.user ?? null);
            if (event === "SIGNED_OUT") {
                router.push("/login");
            } else if (event === "SIGNED_IN" && ["/login", "/signup"].includes(pathname)) {
                router.push("/dashboard");
            }
        });

        return () => {
            authListener.subscription.unsubscribe();
        };
    }, [router, pathname]);

    if (loading) {
        return (
            <div className="flex items-center justify-center min-h-screen text-white bg-black">
                <p>Loading...</p>
            </div>
        );
    }

    const publicRoutes = ["/", "/login", "/signup"];
    const isPublicRoute = publicRoutes.includes(pathname);

    if (isPublicRoute && !user) {
        return <>{children}</>;
    }

    return (
        <div className="flex min-h-screen bg-black">
            <Sidebar>
                <SidebarBody className="flex flex-col gap-4">
                    {sidebarItems.map((item) => (
                        <SidebarLink key={item.href} link={item} />
                    ))}
                </SidebarBody>
            </Sidebar>

            <div className="flex-1 flex flex-col relative">
                <Navbar />
                <main className="flex-1 pt-19 pl-15">{children}</main>
            </div>
        </div>
    );
}

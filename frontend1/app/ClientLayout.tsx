"use client";

import { Sidebar, SidebarBody, SidebarLink } from "@/components/ui/sidebar";
import { IconHome, IconUser, IconSettings } from "@tabler/icons-react";
import { Navbar } from "@/components/ui/navbar";

const sidebarItems = [
  { label: "Home", icon: <IconHome />, href: "/" },
  { label: "Model", icon: <IconUser />, href: "/model" },
  { label: "Settings", icon: <IconSettings />, href: "/settings" },
];

export default function ClientLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* Sidebar with fixed width and positioning */}
      <Sidebar className="w-64 fixed h-full left-0 top-0 z-10 bg-white shadow-md">
        <SidebarBody className="flex flex-col gap-4 p-4">
          {sidebarItems.map((item) => (
            <SidebarLink key={item.href} link={item} />
          ))}
        </SidebarBody>
      </Sidebar>

      {/* Main content area */}
      <div className="flex-1 flex flex-col ml-64"> {/* Offset for sidebar */}
        <Navbar className="sticky top-0 z-10 bg-white shadow-sm" />
        <main className="flex-1 p-6">
          {children}
        </main>
      </div>
    </div>
  );
}
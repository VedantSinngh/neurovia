"use client";
import { cn } from "@/lib/utils";
import Link, { LinkProps } from "next/link";
import React, { useState, createContext, useContext } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { IconMenu2, IconX, IconBrain, IconLogout, IconClipboard } from "@tabler/icons-react";

interface Links {
    label: string;
    href: string;
    icon: React.JSX.Element | React.ReactNode;
}

interface SidebarContextProps {
    open: boolean;
    setOpen: React.Dispatch<React.SetStateAction<boolean>>;
    animate: boolean;
}

const SidebarContext = createContext<SidebarContextProps | undefined>(undefined);

export const useSidebar = () => {
    const context = useContext(SidebarContext);
    if (!context) {
        throw new Error("useSidebar must be used within a SidebarProvider");
    }
    return context;
};

export const SidebarProvider = ({
    children,
    open: openProp,
    setOpen: setOpenProp,
    animate = true,
}: {
    children: React.ReactNode;
    open?: boolean;
    setOpen?: React.Dispatch<React.SetStateAction<boolean>>;
    animate?: boolean;
}) => {
    const [openState, setOpenState] = useState(false);

    const open = openProp !== undefined ? openProp : openState;
    const setOpen = setOpenProp !== undefined ? setOpenProp : setOpenState;

    return (
        <SidebarContext.Provider value={{ open, setOpen, animate }}>
            {children}
        </SidebarContext.Provider>
    );
};

export const Sidebar = ({
    children,
    open,
    setOpen,
    animate,
}: {
    children: React.ReactNode;
    open?: boolean;
    setOpen?: React.Dispatch<React.SetStateAction<boolean>>;
    animate?: boolean;
}) => {
    return (
        <SidebarProvider open={open} setOpen={setOpen} animate={animate}>
            {children}
        </SidebarProvider>
    );
};

export const SidebarBody = (props: React.ComponentProps<typeof motion.div>) => {
    return (
        <>
            <DesktopSidebar {...props} />
            <MobileSidebar {...(props as React.ComponentProps<"div">)} />
        </>
    );
};

export const DesktopSidebar = ({
    className,
    children,
    ...props
}: React.ComponentProps<typeof motion.div>) => {
    const { open, setOpen, animate } = useSidebar();
    return (
        <motion.div
            className={cn(
                "fixed top-0 left-0 h-screen px-6 py-28 hidden md:flex md:flex-col bg-transparent backdrop-blur-md w-[280px]  border-[rgb(14,24,49)] z-40",
                
            )}
            animate={{
                width: animate ? (open ? "280px" : "80px") : "280px",
            }}
            initial={false}
            onMouseEnter={() => animate && setOpen(true)}
            onMouseLeave={() => animate && setOpen(false)}
            {...props}
        >
            <div className="flex flex-col justify-between h-full">
                <div className="space-y-2">
                    {children}
                </div>
                <div className="mt-auto pt-8 border-t border-[rgb(14,24,49)]">
                    <SidebarLink
                        link={{
                            label: "Records",
                            href: "/records",
                            icon: <IconClipboard />
                        }}
                        className="mb-4"
                    />
                    <SidebarLink
                        link={{
                            label: "Model",
                            href: "/model",
                            icon: <IconBrain />
                        }}
                        className="mb-4"
                    />
                    <SidebarLink
                        link={{
                            label: "Logout",
                            href: "/logout",
                            icon: <IconLogout />
                        }}
                    />
                </div>
            </div>
        </motion.div>
    );
};

export const MobileSidebar = ({
    className,
    children,
    ...props
}: React.ComponentProps<"div">) => {
    const { open, setOpen } = useSidebar();
    return (
        <div
            className={cn(
                "h-14 px-6 py-4 flex flex-row md:hidden items-center justify-between bg-[rgb(10,11,16)] w-full",
                className
            )}
            {...props}
        >
            <div className="flex justify-end z-20 w-full">
                <IconMenu2
                    className="text-white h-9 w-9"
                    onClick={() => setOpen(!open)}
                />
            </div>
            <AnimatePresence>
                {open && (
                    <motion.div
                        initial={{ x: "-100%", opacity: 0 }}
                        animate={{ x: 0, opacity: 1 }}
                        exit={{ x: "-100%", opacity: 0 }}
                        transition={{ duration: 0.3, ease: "easeInOut" }}
                        className={cn(
                            "fixed h-screen w-full inset-0 bg-[rgb(10,11,16)] p-12 z-[100] flex flex-col justify-between",
                            className
                        )}
                    >
                        <div
                            className="absolute right-12 top-12 z-50 text-white"
                            onClick={() => setOpen(!open)}
                        >
                            <IconX className="h-9 w-9" />
                        </div>
                        <div className="flex flex-col h-full">
                            <div className="space-y-6">
                                {children}
                            </div>
                            <div className="mt-auto pt-8 border-t border-[rgb(14,24,49)]">
                                <SidebarLink
                                    link={{
                                        label: "Records",
                                        href: "/records",
                                        icon: <IconClipboard />
                                    }}
                                    className="mb-6"
                                />
                                <SidebarLink
                                    link={{
                                        label: "Profile",
                                        href: "/profile",
                                        icon: <IconBrain />
                                    }}
                                    className="mb-6"
                                />
                                <SidebarLink
                                    link={{
                                        label: "Logout",
                                        href: "/logout",
                                        icon: <IconLogout />
                                    }}
                                />
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};

export const SidebarLink = ({
    link,
    className,
    ...props
}: {
    link: Links;
    className?: string;
    props?: LinkProps;
}) => {
    const { open, animate } = useSidebar();
    return (
        <Link
            href={link.href}
            className={cn(
                "flex items-center justify-start gap-5 group/sidebar py-4",
                className
            )}
            {...props}
        >
            {React.cloneElement(link.icon as React.ReactElement, {
                className: "h-8 w-8 text-[rgb(65,125,234)] group-hover/sidebar:text-white transition-colors duration-200"
            })}
            <motion.span
                animate={{
                    display: animate ? (open ? "inline-block" : "none") : "inline-block",
                    opacity: animate ? (open ? 1 : 0) : 1,
                }}
                className="text-white text-2xl font-medium group-hover/sidebar:text-[rgb(65,125,234)] group-hover/sidebar:translate-x-1 transition duration-150 whitespace-pre inline-block !p-0 !m-0"
            >
                {link.label}
            </motion.span>
        </Link>
    );
};
"use client";
import { IconSearch, IconBell, IconMoon, IconSun, IconChevronDown } from "@tabler/icons-react";
import Image from "next/image";
import { useState } from "react";
import { Search } from 'lucide-react';

export const Navbar = () => {
    const [isDarkMode, setIsDarkMode] = useState(true);
    const [isDropdownOpen, setIsDropdownOpen] = useState(false); // State for dropdown visibility
    const [isLoginModalOpen, setIsLoginModalOpen] = useState(false); // State for login modal
    const [isSignupModalOpen, setIsSignupModalOpen] = useState(false); // State for signup modal

    const toggleTheme = () => {
        setIsDarkMode(!isDarkMode);
    };

    const toggleDropdown = () => {
        setIsDropdownOpen(!isDropdownOpen);
    };

    const openLoginModal = () => {
        setIsLoginModalOpen(true);
        setIsDropdownOpen(false); // Close dropdown after selection
    };

    const openSignupModal = () => {
        setIsSignupModalOpen(true);
        setIsDropdownOpen(false); // Close dropdown after selection
    };

    const closeModals = () => {
        setIsLoginModalOpen(false);
        setIsSignupModalOpen(false);
    };

    return (
        <>
            <nav className="fixed top-0 left-0 right-0 h-24 bg-transparent backdrop-blur-md text-white flex items-center justify-between px-8 z-40 border-b border-[rgb(14,24,49)]/40 md:left-[80px] transition-all duration-300">
                {/* Left: Logo */}
                <div className="flex items-center gap-3">
                    <div className="hidden md:flex items-center gap-3">
                        <div className="h-16 w-16 rounded-full bg-transparent flex items-center justify-center border border-transparent hover:border-[rgb(65,125,234)] transition-colors">
                            <Image
                                src="/main-logo.png"
                                alt="100xDevs Logo"
                                width={64}
                                height={64}
                                className="rounded-full"
                            />
                        </div>
                    </div>
                    <div className="flex md:hidden items-center gap-2">
                        <div className="h-12 w-12 rounded-full bg-[rgb(14,24,49)]/60 flex items-center justify-center border border-[rgb(65,125,234)]/30">
                            <Image
                                src="/main-logo.png"
                                alt="100xDevs Logo"
                                width={44}
                                height={44}
                                className="rounded-full"
                            />
                        </div>
                    </div>
                </div>

                {/* Right side: Search Bar and Icons */}
                <div className="flex items-center gap-6">
                    <div className="relative">
                        <input
                            type="text"
                            placeholder="Search Anything"
                            className="w-64 h-12 px-4 pl-4 pr-12 py-2 bg-[rgb(14,24,49)]/60 text-white rounded-full border border-[rgb(14,24,49)] focus:border-[rgb(65,125,234)] focus:outline-none focus:ring-1 focus:ring-[rgb(65,125,234)] transition-all"
                        />
                        <Search className="absolute right-4 top-1/2 -translate-y-1/2 h-5 w-5 text-[rgb(65,125,234)]" />
                    </div>

                    <div className="flex items-center gap-5">
                        <button className="p-2 rounded-full hover:bg-[rgb(14,24,49)]/60 transition-colors relative">
                            <IconBell className="h-8 w-8 text-white" />
                            <span className="absolute top-1 right-1 h-3 w-3 rounded-full bg-[rgb(65,125,234)] border border-[rgb(10,11,16)]"></span>
                        </button>
                        <button
                            className="p-2 rounded-full hover:bg-[rgb(14,24,49)]/60 transition-colors"
                            onClick={toggleTheme}
                            aria-label={isDarkMode ? "Switch to light mode" : "Switch to dark mode"}
                        >
                            {isDarkMode ? (
                                <IconMoon className="h-8 w-8 text-[rgb(65,125,234)]" />
                            ) : (
                                <IconSun className="h-8 w-8 text-[rgb(65,125,234)]" />
                            )}
                        </button>

                        {/* Down Arrow Icon for Dropdown */}
                        <div className="relative">
                            <button
                                className="p-2 rounded-full hover:bg-[rgb(14,24,49)]/60 transition-colors"
                                onClick={toggleDropdown}
                                aria-label="Open login/signup dropdown"
                            >
                                <IconChevronDown className="h-8 w-8 text-[rgb(65,125,234)]" />
                            </button>

                            {/* Dropdown Menu */}
                            {isDropdownOpen && (
                                <div className="absolute right-0 mt-2 w-40 bg-[rgb(14,24,49)]/90 backdrop-blur-md rounded-md shadow-lg z-50 border border-[rgb(65,125,234)]/30">
                                    <button
                                        onClick={openLoginModal}
                                        className="block w-full text-left px-4 py-2 text-white hover:bg-[rgb(65,125,234)]/50 transition-colors"
                                    >
                                        Login
                                    </button>
                                    <button
                                        onClick={openSignupModal}
                                        className="block w-full text-left px-4 py-2 text-white hover:bg-[rgb(65,125,234)]/50 transition-colors"
                                    >
                                        Sign Up
                                    </button>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </nav>

            {/* Login Modal */}
            {isLoginModalOpen && (
                <div className="fixed inset-0 bg-black/50 flex justify-center items-center z-50">
                    <div className="bg-white dark:bg-gray-800 p-8 rounded-lg w-96 relative">
                        <h2 className="text-xl font-bold text-center text-gray-900 dark:text-white mb-4">Login</h2>
                        <div className="flex flex-col space-y-4">
                            <input
                                type="text"
                                placeholder="Username or Email"
                                className="w-full px-4 py-2 border rounded-md"
                            />
                            <input
                                type="password"
                                placeholder="Password"
                                className="w-full px-4 py-2 border rounded-md"
                            />
                            <button className="px-4 py-2 bg-blue-600 text-white rounded-md">Login</button>
                        </div>
                        <button
                            onClick={closeModals}
                            className="absolute top-2 right-2 text-gray-500 hover:text-gray-700"
                        >
                            X
                        </button>
                    </div>
                </div>
            )}

            {/* Signup Modal */}
            {isSignupModalOpen && (
                <div className="fixed inset-0 bg-black/50 flex justify-center items-center z-50">
                    <div className="bg-white dark:bg-gray-800 p-8 rounded-lg w-96 relative">
                        <h2 className="text-xl font-bold text-center text-gray-900 dark:text-white mb-4">Sign Up</h2>
                        <div className="flex flex-col space-y-4">
                            <input
                                type="text"
                                placeholder="Username"
                                className="w-full px-4 py-2 border rounded-md"
                            />
                            <input
                                type="email"
                                placeholder="Email"
                                className="w-full px-4 py-2 border rounded-md"
                            />
                            <input
                                type="password"
                                placeholder="Password"
                                className="w-full px-4 py-2 border rounded-md"
                            />
                            <button className="px-4 py-2 bg-gray-600 text-white rounded-md">Sign Up</button>
                        </div>
                        <button
                            onClick={closeModals}
                            className="absolute top-2 right-2 text-gray-500 hover:text-gray-700"
                        >
                            X
                        </button>
                    </div>
                </div>
            )}
        </>
    );
};
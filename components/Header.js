"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Menu, X } from "lucide-react";
import Ctnr from "@/components/Ctnr";
import Button from "@/components/Button";
import RollingLink from "@/components/RollingLink";

export default function Header() {
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const handleCloseMenu = () => setIsMenuOpen(false);

    return (
        <header className="sticky top-0 z-50 w-full bg-white border-b border-gray-200 shadow-xs">
            {/* <Ctnr className="flex flex-row items-center justify-between py-4 bg-white border border-gray-200 border-t-0 rounded-b-xl shadow-xs"> */}
            <Ctnr className="flex flex-row items-center justify-between py-4">
                {/* Logo on the left */}
                <Link href="/" className="flex items-center">
                    <Image
                        src="/images/yi-icon.avif?v=2"
                        alt="Yukti Insights Icon"
                        className="w-auto h-12"
                        width={100}
                        height={200}
                    />
                </Link>

                {/* Navigation items on the right */}
                <nav className="relative flex items-center gap-4">
                    <div className="hidden items-center gap-6 md:flex">
                        <RollingLink
                            href="#services"
                            className="text-[var(--color-tertiary)] hover:text-[var(--color-primary)] transition-colors"
                        >
                            Our Services
                        </RollingLink>
                        <RollingLink
                            href="#about"
                            className="text-[var(--color-tertiary)] hover:text-[var(--color-primary)] transition-colors"
                        >
                            About Us
                        </RollingLink>
                    </div>
                    <Link href="#contact">
                        <Button className="bg-[var(--color-tertiary)] text-white">
                            Let's Talk
                        </Button>
                    </Link>
                    <Button
                        type="button"
                        variant="ghost"
                        iconOnly
                        className="md:hidden border border-gray-200 text-[var(--color-tertiary)] hover:border-[var(--color-primary)] hover:text-[var(--color-primary)] rounded-md"
                        onClick={() => setIsMenuOpen((prev) => !prev)}
                        aria-label="Toggle navigation menu"
                        aria-expanded={isMenuOpen}
                    >
                        {isMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
                    </Button>

                    {isMenuOpen && (
                        <div className="absolute right-0 top-full mt-3 w-48 rounded-xl border border-gray-100 bg-white p-3 shadow-lg md:hidden">
                            <div className="flex flex-col gap-3">
                                <RollingLink
                                    href="#services"
                                    className="text-[var(--color-tertiary)] transition-colors hover:text-[var(--color-primary)]"
                                    onClick={handleCloseMenu}
                                >
                                    Our Services
                                </RollingLink>
                                <RollingLink
                                    href="#about"
                                    className="text-[var(--color-tertiary)] transition-colors hover:text-[var(--color-primary)]"
                                    onClick={handleCloseMenu}
                                >
                                    About Us
                                </RollingLink>
                            </div>
                        </div>
                    )}
                </nav>
            </Ctnr>
        </header>
    );
}


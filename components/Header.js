import Image from "next/image";
import Link from "next/link";
import Ctnr from "@/components/Ctnr";
import Button from "@/components/Button";

export default function Header() {
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
                <nav className="flex items-center gap-6">
                    <Link
                        href="#services"
                        className="text-[var(--color-tertiary)] hover:text-[var(--color-primary)] transition-colors"
                    >
                        Our Services
                    </Link>
                    <Link
                        href="#about"
                        className="text-[var(--color-tertiary)] hover:text-[var(--color-primary)] transition-colors"
                    >
                        About Us
                    </Link>
                    <Link href="#contact">
                        <Button className="bg-[var(--color-tertiary)] text-white">
                            Let's Talk
                        </Button>
                    </Link>
                </nav>
            </Ctnr>
        </header>
    );
}


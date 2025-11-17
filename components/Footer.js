import Ctnr from "@/components/Ctnr";
import Image from "next/image";
import RollingLink from "@/components/RollingLink";

export default function Footer() {
    return (
        <Ctnr className="py-12">
            <div className="flex flex-row gap-2">
                <div className="w-1/2 flex flex-col gap-2">
                    <div className="p-5 sm:p-8 bg-[var(--color-tertiary)] text-white rounded-xl">
                        <Image src="/images/yi-logo-dark-bg.avif" alt="Yukti Insights Logo" className="w-48" width={900} height={500} />
                    </div>
                    <div className="p-5 sm:p-8 bg-[var(--color-tertiary)] text-white rounded-xl flex flex-col justify-end flex-1">
                        <p>&copy; {new Date().getFullYear()} Yukti Insights</p>
                    </div>
                </div>
                <div className="w-1/2 flex flex-col gap-2">
                    <div className="p-5 sm:p-8 bg-[var(--color-tertiary)] text-white rounded-xl flex flex-col gap-2">
                        <h3 className="text-lg instrument-serif-regular opacity-75">COMPANY</h3>
                        <ul className="flex flex-col">
                            <li>
                                <RollingLink href="#" as="anchor" className="hover:underline hover:text-[var(--color-primary)]">
                                    About Us
                                </RollingLink>
                            </li>
                            <li>
                                <RollingLink href="#" as="anchor" className="hover:underline hover:text-[var(--color-primary)]">
                                    Our Services
                                </RollingLink>
                            </li>
                            <li>
                                <a href="#" as="anchor" className="cursor-progress">
                                    Blog
                                </a>
                            </li>
                            <li>
                                <RollingLink href="#" as="anchor" className="hover:underline hover:text-[var(--color-primary)]">
                                    Terms & Conditions
                                </RollingLink>
                            </li>
                            <li>
                                <RollingLink href="#" as="anchor" className="hover:underline hover:text-[var(--color-primary)]">
                                    Privacy Policy
                                </RollingLink>
                            </li>
                        </ul>
                    </div>
                    <div className="p-5 sm:p-8 bg-[var(--color-tertiary)] text-white rounded-xl flex flex-col gap-2">
                        <h3 className="text-lg instrument-serif-regular opacity-75">CONNECT</h3>
                        <ul className="flex flex-col">
                            <li>
                                <RollingLink href="mailto:info@yuktii.in" as="anchor" className="hover:underline hover:text-[var(--color-primary)]">
                                    info@yuktii.in
                                </RollingLink>
                            </li>
                            <li>
                                <RollingLink href="mailto:mvn@yuktii.in" as="anchor" className="hover:underline hover:text-[var(--color-primary)]">
                                    mvn@yuktii.in
                                </RollingLink>
                            </li>
                        </ul>
                    </div>
                    <div className="p-5 sm:p-8 bg-[var(--color-tertiary)] text-white rounded-xl">
                        <p>Built with 💛 in Bengaluru, India—560065</p>
                    </div>
                </div>
            </div>
        </Ctnr>
    );
}
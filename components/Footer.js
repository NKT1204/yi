import Ctnr from "@/components/Ctnr";
import Image from "next/image";

export default function Footer() {
    return (
        <Ctnr className="pt-12 pb-4">
            <div className="flex flex-row gap-2">
                <div className="w-1/2 flex flex-col gap-2">
                    <div className="p-8 bg-[var(--color-tertiary)] text-white rounded-xl">
                        <Image src="/images/yi-logo-dark-bg.avif" alt="Yukti Insights Logo" className="w-48" width={900} height={500} />
                    </div>
                    <div className="p-8 bg-[var(--color-primary)] text-[var(--color-tertiary)] rounded-xl flex flex-col justify-end flex-1">
                        <p>&copy; {new Date().getFullYear()} Yukti Insights</p>
                    </div>
                </div>
                <div className="w-1/2 flex flex-col gap-2">
                    <div className="p-8 bg-[var(--color-primary)] text-[var(--color-tertiary)] rounded-xl flex flex-col gap-2">
                        <h3 className="text-lg instrument-serif-regular opacity-75">COMPANY</h3>
                        <ul className="flex flex-col">
                            <li><a href="#" className="hover:underline">About Us</a></li>
                            <li><a href="#" className="hover:underline">Our Services</a></li>
                            <li><a href="#" className="cursor-progress">Blog</a></li>
                            <li><a href="#" className="hover:underline">Terms & Conditions</a></li>
                            <li><a href="#" className="hover:underline">Privacy Policy</a></li>
                        </ul>
                    </div>
                    <div className="p-8 bg-[var(--color-tertiary)] text-white rounded-xl flex flex-col gap-2">
                        <h3 className="text-lg instrument-serif-regular opacity-75">CONNECT</h3>
                        <ul className="flex flex-col">
                            <li><a href="mailto:info@yuktii.in" className="hover:underline">info@yuktii.in</a></li>
                            <li><a href="mailto:mvn@yuktii.in" className="hover:underline">mvn@yuktii.in</a></li>
                        </ul>
                    </div>
                    <div className="p-8 bg-[var(--color-secondary)] text-white rounded-xl">
                        <p>Built with 💛 in Bengaluru, India—560065</p>
                    </div>
                </div>
            </div>
        </Ctnr>
    );
}
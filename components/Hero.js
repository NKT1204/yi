import Ctnr from "@/components/Ctnr";
import Button from "@/components/Button";
import RippleCanvas from "@/components/RippleCanvas";

export default function Hero() {
    return (
        <div className="py-12">
            <Ctnr>
                <div className="flex flex-col md:flex-row items-center gap-8 md:gap-12">
                    {/* Left column - Text content */}
                    <div className="w-full md:w-1/2">
                        <h1 className="text-4xl md:text-5xl lg:text-6xl instrument-serif-regular text-[var(--color-tertiary)] mb-0">
                            Inspiring Change
                        </h1>
                        <h1 className="text-4xl md:text-5xl lg:text-6xl instrument-serif-regular text-[var(--color-secondary)] mb-8">
                            Amplifying Impact
                        </h1>
                        <p className="text-lg md:text-xl text-gray-700 mb-8">
                            Yukti Insights is a development consultancy supporting organisations at every stage of their CSR journey, helping them deliver change that matters.
                        </p>
                        <Button className="bg-[var(--color-tertiary)] text-white">
                            Know More&nbsp;&nbsp;→
                        </Button>
                    </div>

                    {/* Right column - Ripple animation */}
                    <div className="w-full md:w-1/2 flex items-center justify-center">
                        <div className="relative w-full aspect-square overflow-hidden rounded-[2.5rem]">
                            <RippleCanvas />
                        </div>
                    </div>
                </div>
            </Ctnr>
        </div>
    );
}


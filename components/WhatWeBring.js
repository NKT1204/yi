import Ctnr from "@/components/Ctnr";

const stats = [
    {
        value: "100+",
        label: "Projects Initiated",
        icon: "/images/projects-initiated.svg",
    },
    {
        value: "1Cr+",
        label: "Funds Managed",
        icon: "/images/funds-managed.svg",
    },
    {
        value: "85,000+",
        label: "Individuals Trained",
        icon: "/images/individuals-trained.svg",
    },
    {
        value: "75+",
        label: "Years of Combined Experience",
        icon: "/images/combined-yoe.svg",
    },
];

export default function WhatWeBring() {
    return (
        <section className="bg-[var(--color-secondary)] text-white py-8 pb-0 md:pb-12 md:py-24 mx-4 rounded-xl">
            <Ctnr>
                <div className="text-center space-y-4 mb-12">
                    <p className="text-sm uppercase tracking-[0.35em] text-white/70">
                        What We Bring
                    </p>
                    <h2 className=" mx-auto text-4xl max-w-2xl md:text-5xl/13 instrument-serif-regular">
                        We back bold ideas with experience, scale, and stewardship.
                    </h2>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
                    {stats.map(({ value, label, icon }) => (
                        <div
                            key={label}
                            // className="text-center border border-white/15 rounded-2xl px-6 py-10 bg-white/5 backdrop-blur-sm flex flex-col gap-6"
                            className="text-center px-6 py-10 flex flex-col gap-8"
                        >
                            <div className="flex justify-center">
                                <div
                                    aria-hidden="true"
                                    className="w-40 h-40 bg-[var(--color-primary)]"
                                    style={{
                                        WebkitMaskImage: `url(${icon})`,
                                        maskImage: `url(${icon})`,
                                        WebkitMaskRepeat: "no-repeat",
                                        maskRepeat: "no-repeat",
                                        WebkitMaskSize: "contain",
                                        maskSize: "contain",
                                        WebkitMaskPosition: "center",
                                        maskPosition: "center",
                                    }}
                                />
                            </div>
                            <div className="space-y-2">
                                <p className="text-4xl md:text-5xl instrument-serif-regular">
                                    {value}
                                </p>
                                <p className="text-base md:text-lg text-white/80">{label}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </Ctnr>
        </section>
    );
}


'use client';

import { useCallback, useEffect, useRef, useState } from "react";
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

const AUTO_SCROLL_MS = 4500;

export default function WhatWeBring() {
    const carouselRef = useRef(null);
    const [activeIndex, setActiveIndex] = useState(0);

    const scrollToSlide = useCallback((index, behavior = "smooth") => {
        const container = carouselRef.current;
        if (!container) return;
        const width = container.clientWidth;
        container.scrollTo({
            left: width * index,
            behavior,
        });
    }, []);

    useEffect(() => {
        const container = carouselRef.current;
        if (!container) return;

        let ticking = false;

        const handleScroll = () => {
            if (ticking) return;
            ticking = true;
            window.requestAnimationFrame(() => {
                const width = container.clientWidth;
                if (!width) {
                    ticking = false;
                    return;
                }
                const index = Math.round(container.scrollLeft / width);
                setActiveIndex(index);
                ticking = false;
            });
        };

        container.addEventListener("scroll", handleScroll, { passive: true });

        return () => {
            container.removeEventListener("scroll", handleScroll);
        };
    }, []);

    useEffect(() => {
        const id = window.setInterval(() => {
            setActiveIndex((prev) => {
                const next = (prev + 1) % stats.length;
                scrollToSlide(next);
                return next;
            });
        }, AUTO_SCROLL_MS);

        return () => window.clearInterval(id);
    }, [scrollToSlide]);

    useEffect(() => {
        const handleResize = () => {
            scrollToSlide(activeIndex, "auto");
        };

        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, [activeIndex, scrollToSlide]);

    const handleDotClick = (index) => {
        setActiveIndex(index);
        scrollToSlide(index);
    };

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

                <div className="md:hidden">
                    <div
                        ref={carouselRef}
                        className="flex snap-x snap-mandatory overflow-x-auto scroll-smooth [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
                    >
                        {stats.map(({ value, label, icon }) => (
                            <div key={label} className="w-full flex-shrink-0 snap-center px-2">
                                <div className="text-center px-6 py-10 flex flex-col gap-8">
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
                            </div>
                        ))}
                    </div>
                    <div className="flex flex-col items-center gap-3 mt-6">
                        <div className="flex items-center gap-2 pb-8">
                            {stats.map((_, index) => (
                                <button
                                    key={index}
                                    type="button"
                                    onClick={() => handleDotClick(index)}
                                    className={`h-2.5 w-2.5 rounded-full transition-all duration-300 ${
                                        activeIndex === index
                                            ? "bg-white scale-110"
                                            : "bg-white/40 hover:bg-white/60"
                                    }`}
                                    aria-label={`Show stat ${index + 1} of ${stats.length}`}
                                />
                            ))}
                        </div>
                    </div>
                </div>

                <div className="hidden md:grid grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
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


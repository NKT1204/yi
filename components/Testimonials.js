"use client";

import { useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import Button from "@/components/Button";
import Ctnr from "@/components/Ctnr";

const testimonials = [
    {
        id: "impact",
        title: "Guidance that elevates every training",
        quote: "Mr MV Narayana was a crucial trainer and mentor in our India capacity-building initiative. His workshops on organizational development, fundraising, and communication were engaging, insightful, and full of actionable takeaways. The feedback from our NGO partners was overwhelmingly positive, and his long-term mentoring has left a lasting legacy.",
        author: "Alli Basker",
        role: "Head of Mission, CESVI India",
    },
    {
        id: "collaboration",
        title: "Strategy that turns vision into momentum",
        quote: "Working with Mr. Narayana was a transformative experience for TB Alert India. His strategic foresight and hands-on support in creating a five-year growth plan gave us renewed focus and a clear sense of direction. Mr. Narayana's ability to combine thought leadership with practical execution is truly unique, and his expertise has been invaluable to our organization. We are grateful for his guidance and highly recommend him to any organization seeking strategic planning and growth expertise.",
        author: "Dr. Prabhakar Varma",
        role: "Chairman, TB Alert India",
    },
    {
        id: "speed",
        title: "Capacity building that anchors long-term resilience",
        quote: "The training and mentorship provided by Mr. Narayana marked a pivotal moment in VIEWS’ journey. His profound expertise in nonprofit systems and organizational sustainability significantly strengthened our internal structures and enhanced our fundraising strategies. Mr. Narayana is a true capacity builder, empowering organizations from within by fostering leadership, strategic clarity, and long-term resilience.",
        author: "S.Bheema Rao",
        role: "Executive Director, VIEWS",
    },
    {
        id: "capacity",
        title: "Messaging that turns cinema into advocacy",
        quote: "MV Narayana’s insights on social messaging and strategy for ‘Kadvi Hawa’ and ‘Halkaa’ were extremely valuable. His understanding of development themes and how to communicate them effectively through film helped us engage both policy influencers and the broader community. His role went beyond consulting – he became a thought partner.",
        author: "Nila Madhab Panda",
        role: "Padma Sri Awardee, Acclaimed Filmmaker",
    },
];

export default function Testimonials() {
    const [activeIndex, setActiveIndex] = useState(0);
    const total = testimonials.length;
    const { title, quote, author, role } = testimonials[activeIndex];

    const showPrevious = () => setActiveIndex((prev) => (prev - 1 + total) % total);
    const showNext = () => setActiveIndex((prev) => (prev + 1) % total);

    return (
        <section className="bg-white py-16 pb-8">
            <Ctnr>
                <figure className="relative mx-auto rounded-xl border border-gray-200 px-8 py-12 pb-24 sm:px-12 sm:pb-28">
                    <p className="sr-only">
                        Viewing testimonial {activeIndex + 1} of {total}
                    </p>
                    <p className="text-3xl sm:text-4xl text-[var(--color-secondary)] instrument-serif-regular">{title}</p>
                    <blockquote className="mt-8 text-xl leading-8 text-[var(--color-tertiary)] sm:text-2xl sm:leading-9">
                        <p>&ldquo;{quote}&rdquo;</p>
                    </blockquote>
                    <figcaption className="mt-10 text-md leading-6 text-gray-600">
                        <div className="text-xl font-medium text-gray-900">{author}</div>
                        <div>{role}</div>
                    </figcaption>

                    <div className="absolute bottom-6 right-6 flex items-center gap-4 sm:bottom-8 sm:right-8">
                        <span className="text-sm font-medium text-gray-500">
                            {String(activeIndex + 1).padStart(2, "0")} / {String(total).padStart(2, "0")}
                        </span>
                        <div className="flex gap-2">
                            <Button
                                variant="ghost"
                                iconOnly
                                onClick={showPrevious}
                                aria-label="Show previous testimonial"
                                className="border border-gray-200 text-[var(--color-tertiary)] hover:border-gray-300 rounded-md"
                            >
                                <ChevronLeft className="h-5 w-5" aria-hidden="true" />
                            </Button>
                            <Button
                                variant="ghost"
                                iconOnly
                                onClick={showNext}
                                aria-label="Show next testimonial"
                                className="border border-gray-200 text-[var(--color-tertiary)] hover:border-gray-300 rounded-md"
                            >
                                <ChevronRight className="h-5 w-5" aria-hidden="true" />
                            </Button>
                        </div>
                    </div>
                </figure>
            </Ctnr>
        </section>
    );
}


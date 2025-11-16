import Ctnr from "@/components/Ctnr";
import Button from "@/components/Button";

const services = [
    {
        title: "Strategic CSR Consulting",
        description:
            "From diagnosis to delivery, we help organisations design CSR strategies that align purpose with measurable, lasting impact.",
    },
    {
        title: "Brand Design",
        description:
            "We craft visual identities that communicate your mission with clarity, consistency, and confidence across every touchpoint.",
    },
    {
        title: "Trainings",
        description:
            "Interactive workshops that equip teams and communities with the life skills required to turn ideas into meaningful action.",
    },
    {
        title: "Project Management",
        description:
            "End-to-end programme stewardship that keeps partners aligned, resources optimised, and delivery laser-focused on outcomes.",
    },
];

function ServiceCard({ title, description }) {
    return (
        <div className="border border-white/20 rounded-xl p-6 md:p-8 bg-white/5 backdrop-blur-sm transition-transform duration-200 hover:-translate-y-1">
            <span
                aria-hidden="true"
                className="text-3xl text-[var(--color-primary)] mb-4 block"
            >
                *
            </span>
            <div className="space-y-4">
                <h3 className="text-3xl sm:text-4xl font-semibold instrument-serif-regular">
                    {title}
                </h3>
                <p className="text-white/80 leading-relaxed">{description}</p>
            </div>
        </div>
    );
}

export default function OurServices() {
    const firstRow = services.slice(0, 2);
    const secondRow = services.slice(2);

    return (
        <section className="bg-[var(--color-tertiary)] text-white py-8 md:py-24 mx-4 rounded-xl">
            <Ctnr>
                <div className="space-y-6 mb-12">
                    <div className="space-y-4">
                        <p className="text-sm uppercase tracking-[0.35em] text-white/70">
                            Our Services
                        </p>
                        <h2 className="text-4xl md:text-5xl/13 instrument-serif-regular">
                            From guiding NGOs and CSR programmes to crafting bold brands, we <span className="text-[var(--color-primary)]">unite strategy with design</span> to <span className="text-[var(--color-primary)]">drive lasting impact</span>.
                        </h2>
                    </div>
                    <p className="text-base md:text-lg text-white/80 max-w-3xl">
                        We provide integrated solutions that strengthen capacity, equip individuals with life skills, and bring clarity to the stories you share with the world.
                    </p>
                </div>

                <div className="space-y-6 md:space-y-10">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8 md:max-w-[calc(100%-3rem)] lg:max-w-[calc(100%-7rem)] md:ml-auto md:mr-0">
                        {firstRow.map((service) => (
                            <ServiceCard key={service.title} {...service} />
                        ))}
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8 md:max-w-[calc(100%-2rem)] lg:max-w-[calc(100%-5rem)] md:mr-auto md:ml-0">
                        {secondRow.map((service) => (
                            <ServiceCard key={service.title} {...service} />
                        ))}
                    </div>
                    <div className="flex justify-end md:max-w-[calc(100%-3rem)] lg:max-w-[calc(100%-7rem)] md:ml-auto md:mr-0 pt-2">
                        <Button className="bg-white text-[var(--color-tertiary)]">
                            Know More&nbsp;&nbsp;→
                        </Button>
                    </div>
                </div>
            </Ctnr>
        </section>
    );
}



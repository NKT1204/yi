const testimonials = [
    {
        body: 'Led research, developed MIS strategy, and performed data analysis across 24 agro-ecological zones.',
        author: {
            name: 'NABARD-GIZ',
            imageUrl:
                '/images/nabard-giz.avif',
        },
    },
    {
        body: 'Conducted study and/or due diligence of over 3,500 NGOs; supported the selection for flagship CSR grants.',
        author: {
            name: 'HCL Foundation',
            imageUrl:
                '/images/hcl-foundation.avif',
        },
    },
    {
        body: 'Built stakeholder alliances across 11 Indian states to enhance public health outreach.',
        author: {
            name: 'BMGF',
            imageUrl:
                '/images/bmgf.avif',
        },
    },
    {
        body: 'Designed and executed the global PMNCH partner forum, managing protocols and knowledge deliverables.',
        author: {
            name: 'WHO & Ministry of Health, India',
            imageUrl:
                '/images/who-mhfw.avif',
        },
    },
    {
        body: 'Strengthened institutional capacity through policy and governance reforms.',
        author: {
            name: 'Water for People',
            imageUrl:
                '/images/water-for-people.avif',
        },
    },
    {
        body: 'Strategic redesign and impact evaluation of CSR portfolios.',
        author: {
            name: 'SEG Automotive & NAVA Ltd.',
            imageUrl:
                '/images/seg-nava.avif',
        },
    }
]

import Ctnr from './Ctnr'

export default function AmazingInitiatives() {
    return (
        <div className="py-18 relative isolate overflow-hidden">
            <Ctnr>
                <div className="max-w-2xl text-center mx-auto lg:mx-0 lg:text-left">
                    <p className="text-sm uppercase tracking-[0.35em] text-[var(--color-tertiary)]">You're in good company</p>
                    <h2 className="mt-2 text-4xl md:text-5xl/13 instrument-serif-regular text-[var(--color-secondary)]">
                        We have worked with some amazing initiatives.
                    </h2>
                </div>
                <div className="mx-auto max-w-2xl mt-8 sm:mt-12 lg:mx-0 lg:max-w-none">
                    <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
                        {testimonials.map((testimonial) => (
                            <div key={testimonial.author.name} className="h-full">
                                <figure className="flex h-full flex-col rounded-xl border bg-white border-gray-200 shadow-2xs p-8 leading-relaxed transition-transform duration-200 hover:-translate-y-1">
                                    <div className="mb-3 text-3xl instrument-serif-regular text-[var(--color-secondary)]">{testimonial.author.name}</div>
                                    <blockquote className="text-gray-700 flex-1">
                                        <p>{`${testimonial.body}`}</p>
                                    </blockquote>
                                    <img alt="" src={testimonial.author.imageUrl} className="mt-6 w-full h-auto" />
                                </figure>
                            </div>
                        ))}
                    </div>
                </div>
            </Ctnr>
        </div>
    )
}

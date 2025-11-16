import Ctnr from "@/components/Ctnr";

const testimonials = [
    {
        id: "impact",
        title: "Guidance that elevates every training",
        quote: "Mr MV Narayana was a crucial trainer and mentor in our India capacity-building initiative. His workshops on organizational development, fundraising, and communication were engaging, insightful, and full of actionable takeaways. The feedback from our NGO partners was overwhelmingly positive, and his long-term mentoring has left a lasting legacy.",
        author: "Alli Basker",
        role: "Head of Mission, CESVI India",
        span: "lg:col-span-2",
    },
    {
        id: "collaboration",
        title: "Strategy that turns vision into momentum",
        quote: "Working with Mr. Narayana was a transformative experience for TB Alert India. His strategic foresight and hands-on support in creating a five-year growth plan gave us renewed focus and a clear sense of direction. Mr. Narayana's ability to combine thought leadership with practical execution is truly unique, and his expertise has been invaluable to our organization. We are grateful for his guidance and highly recommend him to any organization seeking strategic planning and growth expertise.",
        author: "Dr. Prabhakar Varma",
        role: "Chairman, TB Alert India",
        span: "lg:col-span-4",
    },
    {
        id: "speed",
        title: "Capacity building that anchors long-term resilience",
        quote: "The training and mentorship provided by Mr. Narayana marked a pivotal moment in VIEWS’ journey. His profound expertise in nonprofit systems and organizational sustainability significantly strengthened our internal structures and enhanced our fundraising strategies. Mr. Narayana is a true capacity builder, empowering organizations from within by fostering leadership, strategic clarity, and long-term resilience.",
        author: "S.Bheema Rao",
        role: "Executive Director, VIEWS",
        span: "lg:col-span-4",
    },
    {
        id: "capacity",
        title: "Messaging that turns cinema into advocacy",
        quote: "MV Narayana’s insights on social messaging and strategy for ‘Kadvi Hawa’ and ‘Halkaa’ were extremely valuable. His understanding of development themes and how to communicate them effectively through film helped us engage both policy influencers and the broader community. His role went beyond consulting – he became a thought partner.",
        author: "Nila Madhab Panda",
        role: "Padma Sri Awardee, Acclaimed Filmmaker",
        span: "lg:col-span-2",
    },
];

export default function Testimonials() {
    return (
        <section className="py-8 md:py-20 md:pb-8">
            <Ctnr className="max-w-7xl mx-auto">
                <div className="grid grid-cols-1 gap-4 lg:grid-cols-6 lg:grid-rows-2">
                    {testimonials.map(({ id, span, title, quote, author, role }) => (
                        <div key={id} className={`flex p-px ${span}`}>
                            <article className="flex h-full w-full flex-col justify-between overflow-hidden rounded-xl bg-white shadow-xs outline outline-gray-200">
                                <div className="p-10">
                                    <p className="mt-2 text-2xl instrument-serif-regular text-[var(--color-secondary)]">{title}</p>
                                    <p className="mt-4 text-base text-gray-600">{quote}</p>
                                </div>
                                <div className="border-t border-gray-100 px-10 py-6">
                                    <p className="text-base font-semibold text-[var(--color-tertiary)]">{author}</p>
                                    <p className="text-sm text-gray-500">{role}</p>
                                </div>
                            </article>
                        </div>
                    ))}
                </div>
            </Ctnr>
        </section>
    );
}



import AnimatedCounter from "./AnimatedCounter";
import { FadeIn } from "./FadeIn";

const testimonials = [
  {
    name: "Dr. Farhan Malik",
    role: "Vice Chancellor, University of Faisalabad",
    quote:
      "Our financial reports went from two-week delays to real-time updates. Collection rate improved by 23% within the first semester.",
    initials: "FM",
    color: "#2563eb",
  },
  {
    name: "Amara Siddiqui",
    role: "Registrar, Punjab University Campus",
    quote:
      "The paper-based system was costing us nearly 40 staff-hours per semester just in reconciliation. That overhead is entirely gone.",
    initials: "AS",
    color: "#059669",
  },
  {
    name: "Bilal Chaudhry",
    role: "Finance Director, COMSATS Lahore",
    quote:
      "Setting up a new academic year used to be a two-week project across three departments. With UniSync, it's a focused afternoon.",
    initials: "BC",
    color: "#d4a843",
  },
  {
    name: "Nadia Rahman",
    role: "Head of IT, Lahore University",
    quote:
      "Multi-tenancy is solid. Each department head sees exactly their data — nothing more, nothing less. Security team approved it immediately.",
    initials: "NR",
    color: "#7c3aed",
  },
  {
    name: "Tariq Anwar",
    role: "Student, GCU Faisalabad",
    quote:
      "I paid my semester fee from my phone in under two minutes. Got my receipt instantly. Much better than standing in bank queues for hours.",
    initials: "TA",
    color: "#dc6b20",
  },
  {
    name: "Sadia Iftikhar",
    role: "Dean of Academics, FAST-NUCES",
    quote:
      "Leadership now has a live view of collection status at any moment. We no longer wait for month-end reports to make decisions.",
    initials: "SI",
    color: "#059669",
  },
];

const doubled = [...testimonials, ...testimonials];

export default function TestimonialsSection() {
  return (
    <section
      className="relative py-28 md:py-36 overflow-hidden"
      style={{ background: "linear-gradient(180deg, #07090f 0%, #05080f 100%)" }}
    >
      {}
      <div
        className="absolute inset-0 opacity-[0.12] pointer-events-none"
        style={{
          backgroundImage: `radial-gradient(circle at 1px 1px, rgba(255,255,255,0.4) 1px, transparent 0)`,
          backgroundSize: "32px 32px",
        }}
      />
      <div className="absolute top-0 left-0 right-0 h-px" style={{ background: "linear-gradient(90deg, transparent, rgba(212,168,67,0.2) 50%, transparent)" }} />

      <div className="relative z-10">
        {}
        <div className="max-w-[1240px] mx-auto px-6 lg:px-10 text-center mb-16">
          <FadeIn>
            <p className="text-[11px] text-[#d4a843] font-bold uppercase tracking-[0.22em] mb-4">
              Social Proof
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-2 mb-5">
              <h2 className="text-[2rem] md:text-[2.75rem] font-bold tracking-[-0.035em] leading-none text-white">
                <AnimatedCounter target={10000} suffix="+" />
              </h2>
              <h2 className="text-[2rem] md:text-[2.75rem] font-bold tracking-[-0.035em] leading-none text-white">
                students managed
              </h2>
            </div>
            <p className="text-[16px] text-white/45 leading-[1.7] max-w-[520px] mx-auto">
              Administrators, finance directors, and students across Pakistan trust
              UniSync every semester.
            </p>
          </FadeIn>
        </div>

        {}
        <div className="relative">
          {}
          <div className="absolute left-0 top-0 bottom-0 w-24 z-10 pointer-events-none" style={{ background: "linear-gradient(to right, #07090f, transparent)" }} />
          <div className="absolute right-0 top-0 bottom-0 w-24 z-10 pointer-events-none" style={{ background: "linear-gradient(to left, #07090f, transparent)" }} />

          <div className="overflow-hidden">
            <div className="marquee-track">
              {doubled.map((t, i) => (
                <TestimonialCard key={i} t={t} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function TestimonialCard({
  t,
}: {
  t: (typeof testimonials)[number];
}) {
  return (
    <div className="flex-shrink-0 w-[340px] mx-3">
      <div
        className="h-full rounded-[20px] p-6 border border-white/[0.07] transition-all duration-300 hover:border-white/[0.12]"
        style={{
          background: "linear-gradient(135deg, rgba(255,255,255,0.05) 0%, rgba(255,255,255,0.02) 100%)",
          backdropFilter: "blur(12px)",
          boxShadow: "0 2px 12px rgba(0,0,0,0.3)",
        }}
      >
        {}
        <div className="flex gap-1 mb-4">
          {Array.from({ length: 5 }).map((_, i) => (
            <svg key={i} className="w-3.5 h-3.5" viewBox="0 0 16 16" fill="#d4a843">
              <path d="M8 1l1.854 3.756L14 5.528l-3 2.923.708 4.127L8 10.47l-3.708 2.108L5 8.45 2 5.528l4.146-.772z" />
            </svg>
          ))}
        </div>

        {}
        <p className="text-[13px] text-white/55 leading-[1.75] mb-5">
          &ldquo;{t.quote}&rdquo;
        </p>

        {}
        <div className="flex items-center gap-3 pt-4 border-t border-white/[0.06]">
          <div
            className="w-9 h-9 rounded-full flex items-center justify-center flex-shrink-0 text-[11px] font-bold text-white"
            style={{ backgroundColor: t.color, opacity: 0.9 }}
          >
            {t.initials}
          </div>
          <div>
            <p className="text-[13px] font-semibold text-white tracking-[-0.01em] leading-tight">
              {t.name}
            </p>
            <p className="text-[11px] text-white/35 leading-tight mt-0.5">
              {t.role}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

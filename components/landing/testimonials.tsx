import * as motion from "motion/react-client";
import { Quote } from "lucide-react";

const TESTIMONIALS = [
  {
    quote:
      "UniSync replaced our entire manual fee voucher system. Collections are faster and tracking is fully automated across all campuses.",
    name: "Dr. Nasir",
    title: "Vice Chancellor",
    avatarBg: "#FDE68A",
    initials: "VC",
  },
  {
    quote:
      "The real-time dashboard gives us instant visibility into our department's finances. Reconciling late fees used to take weeks.",
    name: "Dr. Fatima",
    title: "HOD Computer Science",
    avatarBg: "#BFDBFE",
    initials: "HOD",
  },
  {
    quote:
      "I can now pay my semester fees online in seconds. It has completely eliminated the long bank lines during admission week.",
    name: "Ali Raza",
    title: "BS Software Engineering",
    avatarBg: "#C7D2FE",
    initials: "AR",
  },
];

export default function Testimonials() {
  return (
    <section className="py-24 md:py-32 px-6 md:px-12 lg:px-20 bg-background">
      <div className="max-w-6xl mx-auto">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
            className="max-w-xl"
          >
            <div className="inline-flex items-center gap-2 rounded-full border border-border/80 bg-secondary/50 px-3 py-1 text-xs font-medium text-muted-foreground shadow-sm">
              <span className="h-1.5 w-1.5 rounded-full bg-foreground" />
              Customers
            </div>
            <h2 className="mt-6 font-display text-4xl md:text-5xl lg:text-[3.5rem] leading-[1] tracking-tight">
              Trusted by university administration and <em className="italic text-muted-foreground">students</em> alike.
            </h2>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.5, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
            className="flex items-center gap-2.5 text-sm font-medium text-muted-foreground bg-secondary/40 px-4 py-2 rounded-2xl border border-border/80 shadow-sm"
          >
            <span className="flex -space-x-2 mr-1">
              {TESTIMONIALS.map((t) => (
                <span
                  key={t.name}
                  className="h-8 w-8 rounded-full border-2 border-background flex items-center justify-center text-[10px] font-semibold text-foreground/80 shadow-sm"
                  style={{ background: t.avatarBg }}
                >
                  {t.initials}
                </span>
              ))}
            </span>
            <div className="flex flex-col text-[11px] leading-tight font-semibold uppercase tracking-widest text-muted-foreground/80">
              <span>150+ departments</span>
              <span>50,000+ students</span>
            </div>
          </motion.div>
        </div>

        <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-6">
          {TESTIMONIALS.map((t, i) => (
            <motion.figure
              key={t.name}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{
                duration: 0.5,
                delay: i * 0.1,
                ease: [0.22, 1, 0.36, 1],
              }}
              className="bg-white border border-border/80 shadow-[0_4px_16px_rgba(0,0,0,0.03)] rounded-3xl p-8 md:p-10 flex flex-col"
            >
              <Quote size={20} className="text-muted-foreground/40" />
              <blockquote className="mt-6 text-foreground text-[16px] leading-[1.65] font-medium text-balance flex-1">
                "{t.quote}"
              </blockquote>
              <figcaption className="mt-8 flex items-center gap-4 pt-6 border-t border-border/60">
                <span
                  className="h-10 w-10 rounded-xl shadow-sm flex items-center justify-center text-[11px] font-bold shrink-0 text-foreground/80"
                  style={{ background: t.avatarBg }}
                >
                  {t.initials}
                </span>
                <div>
                  <div className="text-[13px] font-semibold tracking-tight">
                    {t.name}
                  </div>
                  <div className="text-[12px] font-medium text-muted-foreground/80">
                    {t.title}
                  </div>
                </div>
              </figcaption>
            </motion.figure>
          ))}
        </div>
      </div>
    </section>
  );
}

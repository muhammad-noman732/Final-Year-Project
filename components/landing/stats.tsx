import * as motion from "motion/react-client";

const STATS = [
  ["Rs 1B+", "Fees processed securely"],
  ["Zero", "Manual data entry errors"],
  ["24/7", "Real-time updates"],
  ["100%", "Department coverage"],
] as const;

export default function Stats() {
  return (
    <section className="py-20 md:py-24 px-6 md:px-12 lg:px-20 bg-foreground text-primary-foreground">
      <div className="max-w-6xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-10 md:gap-6">
        {STATS.map(([n, l], i) => (
          <motion.div
            key={n}
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-40px" }}
            transition={{ duration: 0.5, delay: i * 0.08, ease: [0.22, 1, 0.36, 1] }}
          >
            <div className="font-display text-5xl md:text-6xl tracking-tight leading-none">{n}</div>
            <div className="mt-3 text-sm text-primary-foreground/60 max-w-[180px]">{l}</div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}

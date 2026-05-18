import * as motion from "motion/react-client";
import { Plus } from "lucide-react";

const FAQS = [
  {
    q: "How is UniSync different from traditional bank vouchers?",
    a: "UniSync eliminates manual reconciliation. Students pay via Stripe, and ledgers are instantly updated without teachers verifying stamped slips.",
  },
  {
    q: "Do we need to switch banks?",
    a: "No. UniSync handles payments via Stripe. You can link your university's existing bank account directly to Stripe for daily payouts.",
  },
  {
    q: "Is student financial data secure?",
    a: "Absolutely. UniSync is fully PCI compliant through our Stripe integration. We do not store any sensitive card information on our servers.",
  },
  {
    q: "Can parents pay fees online?",
    a: "Yes. Students or parents can log into the student portal and pay fees securely via credit or debit card using our Stripe checkout.",
  },
  {
    q: "Do you support multiple departments?",
    a: "Yes. Our multi-tenant architecture supports granular hierarchical roles including Vice Chancellor, Head of Department, and University Admin.",
  },
  {
    q: "How do late fees work?",
    a: "Late fees are automatically calculated and applied by our background cron jobs the moment a deadline passes, completely removing manual tracking.",
  },
];

export default function FAQ() {
  return (
    <section className="py-24 md:py-32 px-6 md:px-12 lg:px-20 bg-background">
      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
          className="text-center"
        >
          <div className="inline-flex items-center gap-1.5 rounded-full border border-border bg-background px-3 py-1 text-xs text-muted-foreground mx-auto">
            <span className="h-1.5 w-1.5 rounded-full bg-accent" />
            FAQ
          </div>
          <h2 className="mt-5 font-display text-4xl md:text-5xl lg:text-6xl leading-[1] tracking-tight">
            Questions, <em className="italic">answered</em>.
          </h2>
        </motion.div>

        <div className="mt-14 border-t border-border">
          {FAQS.map((f, i) => (
            <motion.details
              key={i}
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.4, delay: i * 0.05, ease: [0.22, 1, 0.36, 1] }}
              className="group border-b border-border"
            >
              <summary className="flex items-center justify-between py-6 gap-4 cursor-pointer">
                <span className="font-display text-xl md:text-2xl tracking-tight text-foreground">
                  {f.q}
                </span>
                <span className="h-8 w-8 rounded-full border border-border flex items-center justify-center shrink-0 transition-transform group-open:rotate-45">
                  <Plus size={14} />
                </span>
              </summary>
              <div className="pb-6 pr-12 text-muted-foreground leading-relaxed text-[15px]">
                {f.a}
              </div>
            </motion.details>
          ))}
        </div>
      </div>
    </section>
  );
}

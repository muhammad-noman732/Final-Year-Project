"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { ArrowRight, Menu, X } from "lucide-react";

const NAV_LINKS = [
  { label: "Features", href: "#features" },
  { label: "How It Works", href: "#how-it-works" },
  { label: "Who It's For", href: "#roles" },
];

export default function StickyNav() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled
          ? "bg-white/80 backdrop-blur-2xl border-b border-black/[0.04] shadow-[0_1px_2px_rgba(0,0,0,0.03)]"
          : "bg-transparent"
      }`}
    >
      <div className="max-w-[1240px] mx-auto px-6 lg:px-10">
        <div className="flex items-center justify-between h-[72px]">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2.5 shrink-0">
            <div className="w-8 h-8 rounded-[10px] bg-gradient-to-br from-[#d4a843] to-[#b8922e] flex items-center justify-center shadow-[0_2px_8px_rgba(212,168,67,0.3)]">
              <span className="text-white font-bold text-[13px] tracking-tight">U</span>
            </div>
            <span className="text-[#0a0a0a] font-semibold text-[15px] tracking-[-0.01em]">
              UniSync
            </span>
          </Link>

          {/* Desktop links - center */}
          <div className="hidden md:flex items-center gap-9">
            {NAV_LINKS.map((link) => (
              <a
                key={link.label}
                href={link.href}
                className="text-[13px] text-[#737373] font-medium hover:text-[#0a0a0a] transition-colors duration-200"
              >
                {link.label}
              </a>
            ))}
          </div>

          {/* CTA - right */}
          <div className="hidden md:flex items-center gap-5">
            <Link
              href="/login"
              className="text-[13px] text-[#737373] font-medium hover:text-[#0a0a0a] transition-colors duration-200"
            >
              Sign In
            </Link>
            <Link
              href="/login"
              className="group inline-flex items-center gap-2 px-[18px] py-[9px] rounded-full bg-[#0a0a0a] text-white text-[13px] font-medium
                hover:bg-[#171717] transition-all duration-200 active:scale-[0.97]"
            >
              Get Started
              <ArrowRight className="w-3.5 h-3.5 opacity-60 transition-all duration-200 group-hover:opacity-100 group-hover:translate-x-0.5" />
            </Link>
          </div>

          {/* Mobile toggle */}
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="md:hidden w-10 h-10 flex items-center justify-center rounded-xl text-[#737373] hover:bg-black/[0.03]"
            aria-label="Toggle menu"
          >
            {mobileOpen ? <X className="w-5 h-5" strokeWidth={1.5} /> : <Menu className="w-5 h-5" strokeWidth={1.5} />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {mobileOpen && (
        <div className="md:hidden bg-white/95 backdrop-blur-2xl border-t border-black/[0.04] px-6 py-5 space-y-1">
          {NAV_LINKS.map((link) => (
            <a
              key={link.label}
              href={link.href}
              onClick={() => setMobileOpen(false)}
              className="block text-[14px] text-[#737373] font-medium py-2.5 hover:text-[#0a0a0a]"
            >
              {link.label}
            </a>
          ))}
          <div className="pt-3 border-t border-black/[0.04]">
            <Link
              href="/login"
              className="block text-center w-full px-4 py-2.5 rounded-full bg-[#0a0a0a] text-white text-[14px] font-medium"
            >
              Get Started
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
}

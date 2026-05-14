import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-[#05080f] border-t border-white/[0.05]">
      <div className="max-w-[1240px] mx-auto px-6 lg:px-10 py-10">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          {/* Brand */}
          <div className="flex items-center gap-2.5">
            <div className="w-7 h-7 rounded-[8px] bg-gradient-to-br from-[#d4a843] to-[#b8922e] flex items-center justify-center shadow-[0_2px_6px_rgba(212,168,67,0.25)]">
              <span className="text-white font-bold text-[10px]">U</span>
            </div>
            <span className="text-[13px] text-white font-semibold tracking-[-0.01em]">
              UniSync
            </span>
          </div>

          {/* Links */}
          <div className="flex items-center gap-7">
            <a
              href="#features"
              className="text-[12px] text-white/45 hover:text-white transition-colors duration-200"
            >
              Features
            </a>
            <a
              href="#how-it-works"
              className="text-[12px] text-white/45 hover:text-white transition-colors duration-200"
            >
              How It Works
            </a>
            <a
              href="#roles"
              className="text-[12px] text-white/45 hover:text-white transition-colors duration-200"
            >
              Roles
            </a>
            <Link
              href="/login"
              className="text-[12px] text-white/45 hover:text-white transition-colors duration-200"
            >
              Sign In
            </Link>
          </div>

          {/* Credit */}
          <p className="text-[11px] text-white/30">
            Built by Muhammad Noman &middot; GCU Faisalabad
          </p>
        </div>
      </div>
    </footer>
  );
}

import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-[#0a0a0a] border-t border-white/[0.04]">
      <div className="max-w-[1240px] mx-auto px-6 lg:px-10 py-10">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          {/* Brand */}
          <div className="flex items-center gap-2.5">
            <div className="w-7 h-7 rounded-[8px] bg-gradient-to-br from-[#d4a843] to-[#b8922e] flex items-center justify-center">
              <span className="text-white font-bold text-[10px]">U</span>
            </div>
            <span className="text-[13px] text-white/90 font-semibold tracking-[-0.01em]">
              UniSync
            </span>
          </div>

          {/* Links */}
          <div className="flex items-center gap-7">
            <a href="#features" className="text-[12px] text-[#525252] hover:text-[#a3a3a3] transition-colors duration-200">
              Features
            </a>
            <a href="#how-it-works" className="text-[12px] text-[#525252] hover:text-[#a3a3a3] transition-colors duration-200">
              How It Works
            </a>
            <a href="#roles" className="text-[12px] text-[#525252] hover:text-[#a3a3a3] transition-colors duration-200">
              Roles
            </a>
            <Link href="/login" className="text-[12px] text-[#525252] hover:text-[#a3a3a3] transition-colors duration-200">
              Sign In
            </Link>
          </div>

          {/* Credit */}
          <p className="text-[11px] text-[#404040]">
            Built by Muhammad Noman &middot; GCU Faisalabad
          </p>
        </div>
      </div>
    </footer>
  );
}

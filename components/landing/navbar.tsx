import { GraduationCap } from "lucide-react";

export default function Navbar() {
  return (
    <nav className="relative z-20 flex items-center justify-between px-6 md:px-12 lg:px-20 py-5 font-sans">
      <a
        href="#"
        className="text-xl font-semibold tracking-tight flex items-center gap-2.5"
      >
        <div className="w-8 h-8 rounded-lg bg-secondary border border-border flex items-center justify-center shadow-xs">
          <GraduationCap className="w-4.5 h-4.5 text-foreground" />
        </div>
        <span className="font-semibold text-lg tracking-tight">UniSync</span>
      </a>
      <div className="hidden md:flex items-center gap-8 text-sm text-muted-foreground">
        <a href="#features" className="hover:text-foreground transition-colors">
          Features
        </a>
        <a href="#workflow" className="hover:text-foreground transition-colors">
          How it Works
        </a>
        <a href="#showcase" className="hover:text-foreground transition-colors">
          Dashboard
        </a>
      </div>
      <a
        href="/login"
        className="rounded-xl px-5 py-2.5 text-sm font-medium bg-foreground text-primary-foreground hover:bg-foreground/90 transition-all shadow-[0_2px_8px_rgba(0,0,0,0.08)]"
      >
        Sign in
      </a>
    </nav>
  );
}

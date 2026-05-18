const fs = require('fs');
let oldCss = fs.readFileSync('app/globals.css', 'utf8');

const luminaAdditions = `
/* --- LUMINA THEME (Landing Page) --- */
.lumina-theme {
  --background: #ffffff;
  --foreground: #141414;
  --primary: #171717;
  --primary-foreground: #ffffff;
  --secondary: #f7f7f7;
  --secondary-foreground: #141414;
  --muted: #f5f5f5;
  --muted-foreground: #737373;
  --accent: #171a1c;
  --accent-foreground: #ffffff;
  --border: #e8e8e8;
  --ring: #171717;
  --radius: 0.75rem;
  --shadow-dashboard: 0 25px 80px -12px rgba(0, 0, 0, 0.08), 0 0 0 1px rgba(0, 0, 0, 0.06);
  --lumina-foreground-hsl: 0 0% 8%;
  --cta-glow: radial-gradient(circle at 50% 50%, hsl(var(--lumina-foreground-hsl) / 0.1), transparent 60%);
  --mask-fade-x: linear-gradient(to right, transparent, black 12%, black 88%, transparent);
}

@layer utilities {
  .lumina-reveal {
    opacity: 0;
    transform: translateY(16px);
    transition: opacity 0.7s cubic-bezier(0.22, 1, 0.36, 1), transform 0.7s cubic-bezier(0.22, 1, 0.36, 1);
  }
  .lumina-reveal.in {
    opacity: 1;
    transform: translateY(0);
  }
  @keyframes lumina-scroll-x {
    from { transform: translateX(0); }
    to { transform: translateX(-50%); }
  }
  .lumina-marquee {
    animation: lumina-scroll-x 40s linear infinite;
    width: max-content;
  }
  .lumina-grid-bg {
    background-image: linear-gradient(to right, rgba(0, 0, 0, 0.04) 1px, transparent 1px), linear-gradient(to bottom, rgba(0, 0, 0, 0.04) 1px, transparent 1px);
    background-size: 48px 48px;
  }
  .lumina-frost {
    background: rgba(255, 255, 255, 0.55);
    border: 1px solid rgba(255, 255, 255, 0.6);
    backdrop-filter: blur(14px);
    -webkit-backdrop-filter: blur(14px);
  }
  .lumina-hairline {
    background: linear-gradient(to right, transparent, var(--border), transparent);
    height: 1px;
  }
  @keyframes lumina-pulse-dot {
    0%, 100% { opacity: 1; transform: scale(1); }
    50% { opacity: 0.4; transform: scale(0.85); }
  }
  .lumina-pulse-dot {
    animation: lumina-pulse-dot 1.8s ease-in-out infinite;
  }
  .lumina-bento-grid {
    display: grid;
    grid-template-columns: 1fr;
    grid-template-areas: 'a' 'b' 'c' 'd' 'e';
    gap: 12px;
  }
  @media (min-width: 768px) {
    .lumina-bento-grid {
      grid-template-columns: 1fr 1fr 1fr;
      grid-template-rows: auto auto auto;
      grid-template-areas: 'a a b' 'c c c' 'd e e';
    }
  }
  .lumina-bento-a { grid-area: a; }
  .lumina-bento-b { grid-area: b; }
  .lumina-bento-c { grid-area: c; }
  .lumina-bento-d { grid-area: d; }
  .lumina-bento-e { grid-area: e; }
  .lumina-bento-mockup {
    flex: 1;
    min-height: 0;
  }
  @keyframes lumina-row-in {
    from { opacity: 0; transform: translateY(6px); }
    to { opacity: 1; transform: translateY(0); }
  }
  .lumina-row-reveal {
    opacity: 0;
    animation: lumina-row-in 0.5s cubic-bezier(0.22, 1, 0.36, 1) forwards;
    animation-delay: var(--row-delay, 0s);
  }
}
`;

fs.writeFileSync('app/globals.css', oldCss + '\n' + luminaAdditions);

let pageTsx = fs.readFileSync('app/page.tsx', 'utf8');
pageTsx = pageTsx.replace('<main className="', '<main className="lumina-theme ');
if (!pageTsx.includes('lumina-theme')) {
  pageTsx = pageTsx.replace('<main>', '<main className="lumina-theme">');
}
fs.writeFileSync('app/page.tsx', pageTsx);

"use client"

export function AuthBackground() {
  return (
    <>
      <style>{`
        /* ── base ── */
        .auth-bg {
          position: fixed;
          inset: 0;
          background:
            radial-gradient(ellipse 80% 60% at 20% -10%, #0e1f3d 0%, transparent 65%),
            radial-gradient(ellipse 60% 50% at 85% 110%,  #0a1628 0%, transparent 60%),
            #05080f;
          overflow: hidden;
          pointer-events: none;
          z-index: 0;
        }

        /* ── aurora orbs ── */
        @keyframes orb-drift-a {
          0%   { transform: translate(0,   0)   scale(1);   }
          33%  { transform: translate(6%,  4%)  scale(1.06); }
          66%  { transform: translate(-4%, 8%)  scale(0.96); }
          100% { transform: translate(0,   0)   scale(1);   }
        }
        @keyframes orb-drift-b {
          0%   { transform: translate(0,   0)   scale(1);   }
          40%  { transform: translate(-5%, -6%) scale(1.08); }
          75%  { transform: translate(7%,  3%)  scale(0.94); }
          100% { transform: translate(0,   0)   scale(1);   }
        }
        @keyframes orb-drift-c {
          0%   { transform: translate(0, 0)    scale(1);   }
          50%  { transform: translate(4%, 5%)  scale(1.1); }
          100% { transform: translate(0, 0)    scale(1);   }
        }

        .orb {
          position: absolute;
          border-radius: 50%;
          filter: blur(90px);
          will-change: transform;
        }
        .orb-gold {
          width: 65vw; height: 65vw;
          top: -20%; left: -18%;
          background: radial-gradient(circle, rgba(212,168,67,.22) 0%, rgba(212,168,67,.06) 50%, transparent 70%);
          animation: orb-drift-a 18s ease-in-out infinite;
        }
        .orb-teal {
          width: 55vw; height: 55vw;
          bottom: -18%; right: -15%;
          background: radial-gradient(circle, rgba(20,184,166,.18) 0%, rgba(20,184,166,.05) 50%, transparent 70%);
          animation: orb-drift-b 22s ease-in-out infinite;
        }
        .orb-blue {
          width: 45vw; height: 45vw;
          top: 30%; left: 55%;
          background: radial-gradient(circle, rgba(59,130,246,.12) 0%, rgba(59,130,246,.04) 50%, transparent 70%);
          animation: orb-drift-c 26s ease-in-out infinite;
        }

        /* ── diagonal beam ── */
        @keyframes beam-sweep {
          0%   { opacity: 0; transform: translateX(-120%) skewX(-20deg); }
          15%  { opacity: 1; }
          85%  { opacity: 1; }
          100% { opacity: 0; transform: translateX(220%)  skewX(-20deg); }
        }
        .beam {
          position: absolute;
          top: 0; left: 0;
          width: 28vw; height: 100%;
          background: linear-gradient(
            90deg,
            transparent 0%,
            rgba(212,168,67,.04) 40%,
            rgba(212,168,67,.09) 50%,
            rgba(212,168,67,.04) 60%,
            transparent 100%
          );
          animation: beam-sweep 9s cubic-bezier(.45,0,.55,1) infinite;
          animation-delay: 2s;
          pointer-events: none;
        }
        .beam-2 {
          width: 18vw;
          background: linear-gradient(
            90deg,
            transparent 0%,
            rgba(20,184,166,.03) 40%,
            rgba(20,184,166,.07) 50%,
            rgba(20,184,166,.03) 60%,
            transparent 100%
          );
          animation: beam-sweep 13s cubic-bezier(.45,0,.55,1) infinite;
          animation-delay: 6s;
        }

        /* ── dot grid ── */
        .dot-grid {
          position: absolute;
          inset: 0;
          opacity: .18;
          background-image: radial-gradient(circle, rgba(255,255,255,.55) 1px, transparent 1px);
          background-size: 28px 28px;
        }

        /* ── hex grid overlay ── */
        .hex-grid {
          position: absolute;
          inset: 0;
          opacity: .06;
          background-image:
            linear-gradient(rgba(212,168,67,.6) 1px, transparent 1px),
            linear-gradient(90deg, rgba(212,168,67,.6) 1px, transparent 1px);
          background-size: 64px 64px;
        }

        /* ── floating particles ── */
        @keyframes float-up {
          0%   { transform: translateY(0) scale(1);   opacity: 0; }
          10%  { opacity: 1; }
          90%  { opacity: .7; }
          100% { transform: translateY(-100vh) scale(.4); opacity: 0; }
        }
        .particle {
          position: absolute;
          border-radius: 50%;
          background: rgba(212,168,67,.7);
          will-change: transform, opacity;
          animation: float-up linear infinite;
        }

        /* ── vignette ── */
        .vignette {
          position: absolute;
          inset: 0;
          background: radial-gradient(ellipse 90% 90% at 50% 50%, transparent 55%, rgba(3,5,10,.85) 100%);
        }

        /* ── bottom glow line ── */
        .glow-line {
          position: absolute;
          bottom: 0; left: 0; right: 0;
          height: 1px;
          background: linear-gradient(90deg, transparent 0%, rgba(212,168,67,.4) 50%, transparent 100%);
          filter: blur(1px);
        }

        /* ── corner accent ── */
        .corner-accent {
          position: absolute;
          width: 260px; height: 260px;
          border: 1px solid rgba(212,168,67,.12);
          border-radius: 2px;
          transform: rotate(15deg);
        }
        .corner-tl { top: -80px; left: -80px; }
        .corner-br { bottom: -80px; right: -80px; border-color: rgba(20,184,166,.1); }

        /* ── noise overlay ── */
        .noise {
          position: absolute;
          inset: 0;
          opacity: .025;
          background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E");
          background-repeat: repeat;
          background-size: 180px;
        }
      `}</style>

      <div className="auth-bg" aria-hidden="true">
        {}
        <div className="orb orb-gold" />
        <div className="orb orb-teal" />
        <div className="orb orb-blue" />

        {}
        <div className="hex-grid" />
        <div className="dot-grid" />

        {}
        <div className="beam" />
        <div className="beam beam-2" />

        {}
        {PARTICLES.map((p, i) => (
          <div
            key={i}
            className="particle"
            style={{
              left: `${p.x}%`,
              bottom: `-${p.size * 2}px`,
              width: `${p.size}px`,
              height: `${p.size}px`,
              animationDuration: `${p.dur}s`,
              animationDelay: `${p.delay}s`,
              opacity: 0,
              background: p.gold
                ? `rgba(212,168,67,${p.alpha})`
                : `rgba(20,184,166,${p.alpha * 0.6})`,
            }}
          />
        ))}

        {}
        <div className="corner-accent corner-tl" />
        <div className="corner-accent corner-br" />

        {}
        <div className="vignette" />
        <div className="noise" />

        {}
        <div className="glow-line" />
      </div>
    </>
  )
}

const PARTICLES = Array.from({ length: 28 }, (_, i) => {
  const seed = (i * 9301 + 49297) % 233280
  const seed2 = (seed * 9301 + 49297) % 233280
  const seed3 = (seed2 * 9301 + 49297) % 233280
  return {
    x: (seed / 233280) * 100,
    size: 1.5 + (seed2 / 233280) * 2.5,
    dur: 14 + (seed3 / 233280) * 18,
    delay: (seed / 233280) * -24,
    alpha: 0.4 + (seed2 / 233280) * 0.5,
    gold: i % 3 !== 2,
  }
})

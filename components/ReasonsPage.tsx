"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { Playfair_Display } from "next/font/google";

const playfair = Playfair_Display({ display: "swap", subsets: ["latin"] });

// ✏️ Edit these with your real reasons!
const REASONS_I_LOVE_YOU = [
  "You are cute",
  "The way you care for everyone around you",
  "You make the ordinary feel magical",
  "Your kindness knows no limits",
  "You are home to me",
  "You are respctful and understanding",
  "Your beautiful smile that brightens my day, And more...",
];

const REASONS_YOU_SHOULD_LOVE_ME = [
  "I will always choose you, every day",
  "I remember every little thing you share",
  "I will take good care of you and support you in everything",
  "I will always be by your side, through thick and thin",
  "I love you more every single day",
  "Because I'm completely yours, And more...",
];

const gamePhotos = Array.from({ length: 18 }, (_, i) => `/game-photos/${i + 1}.avif`);

function ReasonItem({ index, text, delay }: { index: number; text: string; delay: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay }}
      className="flex items-baseline justify-center gap-3 mb-4"
    >
      <span
        className={`text-xs italic shrink-0 ${playfair.className}`}
        style={{ color: "#d4789a", minWidth: 24, textAlign: "center" }}
      >
        {String(index + 1).padStart(2, "0")}.
      </span>
      <span className="text-sm lg:text-base leading-relaxed" style={{ color: "#7a2d4a" }}>
        {text}
      </span>
    </motion.div>
  );
}

function Column({
  title, accent, reasons, delayBase,
}: {
  title: string; accent: string; reasons: string[]; delayBase: number;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.7, delay: delayBase }}
      className="flex flex-col items-center text-center w-full"
    >
      {/* Column heading */}
      <p
        className={`text-xs tracking-[0.25em] uppercase mb-1 ${playfair.className}`}
        style={{ color: "#d4789a" }}
      >
        Reasons
      </p>
      <h2
        className={`text-2xl lg:text-3xl font-bold mb-6 ${playfair.className}`}
        style={{ color: "#b5295e" }}
      >
        {accent}
      </h2>

      {/* Reasons list — left-aligned inside a centred container */}
      <div className="w-full max-w-xs text-center">
        {reasons.map((text, i) => (
          <ReasonItem key={i} index={i} text={text} delay={delayBase + 0.1 + i * 0.08} />
        ))}
      </div>
    </motion.div>
  );
}

export default function ReasonsPage() {
  return (
    <div
      className="relative min-h-screen w-full overflow-hidden flex flex-col items-center"
      style={{ background: "linear-gradient(135deg, #fdf0f5 0%, #fce4ec 40%, #f8bbd0 100%)" }}
    >
      {/* Photo grid backdrop */}
      <div className="absolute inset-0 grid grid-cols-6 pointer-events-none" style={{ opacity: 0.07 }}>
        {gamePhotos.map((src, i) => (
          <div key={i} className="relative">
            <Image src={src} alt="" fill className="object-cover" />
          </div>
        ))}
      </div>

      {/* ── I Love You heading ── */}
      <motion.h1
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, delay: 0.1 }}
        className={`relative z-10 text-center pt-12 leading-none ${playfair.className}`}
        style={{
          fontSize: "clamp(3.5rem, 9vw, 8rem)",
          fontWeight: 700,
          color: "#b5295e",
          textShadow: "0 4px 32px rgba(233,30,140,0.15)",
        }}
      >
        I Love You
      </motion.h1>

      {/* decorative line */}
      <motion.div
        initial={{ scaleX: 0 }}
        animate={{ scaleX: 1 }}
        transition={{ duration: 1, delay: 0.5 }}
        className="relative z-10 mt-4 mb-12"
        style={{
          width: "clamp(60px, 15vw, 160px)",
          height: 1,
          background: "linear-gradient(to right, transparent, #e91e8c, transparent)",
        }}
      />

      {/* ── Two columns ── */}
      <div className="relative z-10 flex-1 flex items-start justify-center w-full max-w-4xl px-8 gap-0">

        {/* Left */}
        <div className="flex-1 flex justify-center px-6">
          <Column
            title="Reasons"
            accent="why I love you"
            reasons={REASONS_I_LOVE_YOU}
            delayBase={0.4}
          />
        </div>

        {/* Vertical divider */}
        <div
          className="self-stretch shrink-0"
          style={{
            width: 1,
            background: "linear-gradient(to bottom, transparent, #f48fb1 30%, #f48fb1 70%, transparent)",
          }}
        />

        {/* Right */}
        <div className="flex-1 flex justify-center px-6">
          <Column
            title="Reasons"
            accent="why you should love me"
            reasons={REASONS_YOU_SHOULD_LOVE_ME}
            delayBase={0.6}
          />
        </div>
      </div>

      {/* ── Sign-off ── */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.4, duration: 0.8 }}
        className="relative z-10 flex flex-col items-center gap-1 py-10"
      >
        <div style={{
          width: 50, height: 1,
          background: "linear-gradient(to right, transparent, #f48fb1, transparent)",
          marginBottom: 8,
        }} />
        <p
          className={`text-xs tracking-[0.3em] uppercase ${playfair.className}`}
          style={{ color: "#d4789a" }}
        >
          with all my heart
        </p>
        <p
          className={`text-xl font-bold italic ${playfair.className}`}
          style={{ color: "#b5295e" }}
        >
          forever & always ♥
        </p>
      </motion.div>
    </div>
  );
}

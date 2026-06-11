"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import PhotoPairGame from "../components/PhotoPairGame";
import ValentinesProposal from "@/components/ValentinesProposal";
import ReasonsPage from "@/components/ReasonsPage";
import OrientationGuard from "@/components/OrientationGuard";
import { Playfair_Display } from "next/font/google";


const playfair = Playfair_Display({ display: "swap", subsets: ["latin"] });

const ANIM_DURATION = 2;

type Screen = "game" | "proposal" | "reasons";

export default function Home() {
  const [screen, setScreen] = useState<Screen>("game");
  const [isTransitioning, setIsTransitioning] = useState(false);

  const goTo = (next: Screen) => {
    setIsTransitioning(true);
    setTimeout(() => {
      setScreen(next);
      setIsTransitioning(false);
    }, ANIM_DURATION * 1000);
  };

  return (
    <OrientationGuard>
      <main
        className="min-h-screen w-full overflow-hidden relative"
        style={{ background: "linear-gradient(135deg, #fdf0f5 0%, #fce4ec 40%, #f8bbd0 100%)" }}
      >
        <FloatingHearts />

        <AnimatePresence mode="wait">
          {screen === "game" && (
            <motion.div
              key="game"
              initial={{ opacity: 1 }}
              animate={{ opacity: isTransitioning ? 0 : 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: ANIM_DURATION }}
              className="relative z-10 flex flex-col items-center justify-between min-h-screen py-6"
            >
              <div />
              <PhotoPairGame handleShowProposal={() => goTo("proposal")} />
              <div className="w-full flex items-end justify-between px-16 pb-6">
                <h2
                  className={`text-2xl lg:text-4xl font-bold leading-tight ${playfair.className}`}
                  style={{ color: "#b5295e" }}
                >
                  <span style={{ color: "#d4789a" }}>Match</span>
                  <br />
                  the photo pairs
                </h2>

                <h2
                  className={`text-2xl lg:text-4xl font-bold leading-tight text-right ${playfair.className}`}
                  style={{ color: "#b5295e" }}
                >
                  to reveal
                  <br />
                  <span style={{ color: "#d4789a" }}>the surprise</span>
                </h2>
              </div>
            </motion.div>
          )}

          {screen === "proposal" && (
            <motion.div
              key="proposal"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: ANIM_DURATION }}
              className="w-full min-h-screen"
            >
              <ValentinesProposal onComplete={() => goTo("reasons")} />
            </motion.div>
          )}

          {screen === "reasons" && (
            <motion.div
              key="reasons"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: ANIM_DURATION }}
              className="w-full min-h-screen"
            >
              <ReasonsPage />
            </motion.div>
          )}
        </AnimatePresence>
      </main>
    </OrientationGuard>
  );
}

function FloatingHearts() {
  const hearts = Array.from({ length: 16 }, (_, i) => ({
    id: i,
    char: ["♥", "♡", "❤", "💕"][i % 4],
    left: `${(i * 6.5) % 100}%`,
    size: 14 + (i % 5) * 5,
    duration: 10 + (i % 6) * 3,
    delay: -(i * 1.8),
    opacity: 0.15 + (i % 4) * 0.07,
  }));

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {hearts.map((h) => (
        <span
          key={h.id}
          className="animate-float"
          style={{
            left: h.left,
            fontSize: h.size,
            color: "#e91e8c",
            animationDuration: `${h.duration}s`,
            animationDelay: `${h.delay}s`,
            opacity: h.opacity,
          }}
        >
          {h.char}
        </span>
      ))}
    </div>
  );
}


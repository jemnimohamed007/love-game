"use client";

import { useState, useEffect } from "react";
import { Playfair_Display } from "next/font/google";
import { motion, AnimatePresence } from "framer-motion";
import Fireworks from "@fireworks-js/react";
import Image from "next/image";

const playfairDisplay = Playfair_Display({ display: "swap", subsets: ["latin"] });

const gamePhotos = Array.from({ length: 36 }, (_, i) => `/game-photos/${i + 1}.avif`);

type Props = { onComplete?: () => void };

export default function ValentinesProposal({ onComplete }: Props) {
  const [step, setStep] = useState(0);
  const [position, setPosition] = useState<{ top: string; left: string } | null>(null);
  const [showFireworks, setShowFireworks] = useState(false);

  const getRandomPosition = () => ({
    top: `${10 + Math.random() * 65}%`,
    left: `${5 + Math.random() * 65}%`,
  });

  useEffect(() => {
    if (step < 2) {
      const timer = setTimeout(() => setStep((s) => s + 1), 5000);
      return () => clearTimeout(timer);
    }
  }, [step]);

  const handleYesClick = () => {
    setShowFireworks(true);
    setStep(3);
    // After 4s of fireworks, transition to reasons page

  };

  const headingStyle = { color: "#b5295e" };

  return (
    <div
      className="flex flex-col items-center justify-center min-h-screen w-full relative overflow-hidden"
      style={{ background: "linear-gradient(135deg, #fdf0f5 0%, #fce4ec 40%, #f8bbd0 100%)" }}
    >
      {/* Photo grid backdrop */}
      <div className="absolute inset-0 grid grid-cols-6 pointer-events-none" style={{ opacity: 0.08 }}>
        {gamePhotos.map((src, i) => (
          <div key={i} className="relative h-full">
            <Image src={src} alt="" fill className="object-cover" />
          </div>
        ))}
      </div>

      <AnimatePresence mode="wait">
        {step === 0 && (
          <motion.h2
            key="step-0"
            className={`text-4xl font-semibold mb-4 text-center px-8 ${playfairDisplay.className}`}
            style={headingStyle}
            transition={{ duration: 1 }}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
          >
            Congratulations! You have completed the game. 🎉
          </motion.h2>
        )}

        {step === 1 && (
          <motion.h2
            key="step-1"
            className={`text-4xl font-semibold mb-4 text-center px-8 ${playfairDisplay.className}`}
            style={headingStyle}
            transition={{ duration: 1 }}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
          >
            I have a surprise for you! 💝
          </motion.h2>
        )}

        {step === 2 && (
          <motion.div
            key="step-2"
            transition={{ duration: 1 }}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            className="flex flex-col items-center relative z-10 px-8"
          >
            <h2
              className={`text-4xl lg:text-5xl font-semibold mb-6 text-center ${playfairDisplay.className}`}
              style={headingStyle}
            >
              Will you be my Girlfriend? 🌸
            </h2>

            <Image src="/sad_hamster.png" alt="Sad Hamster" width={180} height={180} />

            {/* Buttons row — always in flow, No teleports only after first hover */}
            <div className="relative mt-16 flex gap-8 justify-center items-center w-full">

              {/* YES */}
              <motion.button
                whileHover={{ scale: 1.07, y: -4 }}
                whileTap={{ scale: 0.93 }}
                transition={{ type: "spring", stiffness: 340, damping: 18 }}
                onClick={handleYesClick}
                className={`font-bold text-white ${playfairDisplay.className}`}
                style={{
                  fontSize: "1.2rem",
                  padding: "16px 56px",
                  borderRadius: "999px",
                  background: "linear-gradient(135deg, #e91e8c 0%, #f06292 100%)",
                  boxShadow: "0 6px 24px rgba(233,30,140,0.5), 0 2px 8px rgba(233,30,140,0.3)",
                  letterSpacing: "0.03em",
                  border: "none",
                  cursor: "pointer",
                }}
              >
                Yes, I will! 🥰
              </motion.button>

              {/* NO — teleports away on hover */}
              <motion.button
                transition={{ type: "spring", stiffness: 300, damping: 20 }}
                className={`font-semibold ${playfairDisplay.className}`}
                style={{
                  fontSize: "1.1rem",
                  padding: "15px 42px",
                  borderRadius: "999px",
                  background: "rgba(255,255,255,0.55)",
                  color: "#b5295e",
                  border: "2px solid #f48fb1",
                  boxShadow: "0 4px 18px rgba(244,143,177,0.35)",
                  backdropFilter: "blur(8px)",
                  letterSpacing: "0.03em",
                  cursor: "pointer",
                  ...(position ? {
                    position: "fixed",
                    top: position.top,
                    left: position.left,
                    zIndex: 50,
                  } : {}),
                }}
                onMouseEnter={() => setPosition(getRandomPosition())}
                onClick={() => setPosition(getRandomPosition())}
              >
                No, I won&apos;t 😢
              </motion.button>

            </div>
          </motion.div>
        )}

        {step === 3 && (
          <motion.div
            key="step-3"
            className={`flex flex-col justify-center items-center text-center px-8 ${playfairDisplay.className}`}
            style={headingStyle}
            transition={{ duration: 1 }}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
          >
            <p className="text-4xl font-semibold">Thank you for accepting, I love you! 💕</p>
            <p className="text-base mt-4" style={{ color: "#c2607e" }}>
              Texte me please!!! 💌
            </p>
            <Image
              src="/hamster_jumping.gif"
              alt="Happy Hamster"
              width={200}
              height={200}
              unoptimized
            />
            {/* Shapeless "next" — just the word, no button chrome */}
            <motion.button
              onClick={onComplete}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 2, duration: 1 }}
              whileHover={{ letterSpacing: "0.25em", opacity: 1 }}
              className={`mt-10 bg-transparent border-none outline-none cursor-pointer tracking-widest uppercase text-sm ${playfairDisplay.className}`}
              style={{ color: "#d4789a", opacity: 0.6 }}
            >
              next
            </motion.button>
          </motion.div>
        )}
      </AnimatePresence>

      {showFireworks && (
        <div className="absolute w-full h-full pointer-events-none">
          <Fireworks
            options={{ autoresize: true, colors: ["#e91e8c", "#f48fb1", "#ff80ab", "#ffcdd2", "#ffffff"] }}
            style={{ width: "100%", height: "100%", position: "absolute", top: 0, left: 0 }}
          />
        </div>
      )}
    </div>
  );
}

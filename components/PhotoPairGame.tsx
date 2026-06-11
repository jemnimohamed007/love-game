"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { useState, useEffect } from "react";

const images = [
  "/game-photos/1.avif",  "/game-photos/2.avif",  "/game-photos/3.avif",
  "/game-photos/4.avif",  "/game-photos/5.avif",  "/game-photos/6.avif",
  "/game-photos/7.avif",  "/game-photos/8.avif",  "/game-photos/9.avif",
  "/game-photos/10.avif", "/game-photos/11.avif", "/game-photos/12.avif",
  "/game-photos/13.avif", "/game-photos/14.avif", "/game-photos/15.avif",
  "/game-photos/16.avif", "/game-photos/17.avif", "/game-photos/18.avif",
];

const imagePairs = images.flatMap((image) => [image, image]);

const shuffleArray = (array: string[]) => {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
};

const heartLayout = [
  [null, null, 0,  1,  null, 2,  3,  null, null],
  [null, 4,    5,  6,  7,    8,  9,  10,   null],
  [11,   12,   13, 14, 15,   16, 17, 18,   19  ],
  [null, 20,   21, 22, 23,   24, 25, 26,   null],
  [null, null, 27, 28, 29,   30, 31, null, null],
  [null, null, null, 32, 33, 34, null, null, null],
  [null, null, null, null, 35, null, null, null, null],
];

type Props = { handleShowProposal: () => void };

export default function PhotoPairGame({ handleShowProposal }: Props) {
  const [selected, setSelected]   = useState<number[]>([]);
  const [matched, setMatched]     = useState<number[]>([]);
  const [incorrect, setIncorrect] = useState<number[]>([]);
  const [imgs] = useState(() => shuffleArray([...imagePairs]));

  const handleClick = async (index: number) => {
    if (selected.length === 2 || matched.includes(index) || selected.includes(index)) return;

    if (selected.length === 1) {
      const firstIndex = selected[0];
      setSelected((prev) => [...prev, index]);
      if (imgs[firstIndex] === imgs[index]) {
        setMatched((prev) => [...prev, firstIndex, index]);
        setSelected([]);
      } else {
        setIncorrect([firstIndex, index]);
        await new Promise((resolve) => setTimeout(resolve, 850));
        setIncorrect([]);
        setSelected([]);
      }
    } else {
      setSelected([index]);
    }
  };

  useEffect(() => {
    if (matched.length === imagePairs.length) handleShowProposal();
  }, [matched, handleShowProposal]);

  const isSelected = (i: number) => selected.includes(i);
  const isMatched  = (i: number) => matched.includes(i);
  const isWrong    = (i: number) => incorrect.includes(i);
  const isHidden   = (i: number) => !isSelected(i) && !isMatched(i);

  return (
    <div
      className="grid grid-cols-9 place-items-center mx-auto"
      style={{
        gap: "clamp(3px, 0.6vw, 7px)",
        gridTemplateRows:    `repeat(7, clamp(48px, 10.5vh, 80px))`,
        gridTemplateColumns: `repeat(9, clamp(48px, 10.5vh, 80px))`,
      }}
    >
      {/* Preload */}
      <div className="hidden">
        {imgs.map((image, i) => (
          <Image key={i} src={image} alt="" fill className="object-cover" priority />
        ))}
      </div>

      {heartLayout.flat().map((index, i) =>
        index !== null ? (
          <motion.div
            key={i}
            className="relative cursor-pointer w-full h-full"
            onClick={() => handleClick(index)}
            style={{ perspective: "1000px" }}
            // Hover: lift + brighten only unflipped cards
            whileHover={isHidden(index) ? { scale: 1.12, y: -3 } : { scale: 1.03 }}
            whileTap={{ scale: 0.95 }}
            transition={{ type: "spring", stiffness: 300, damping: 20 }}
          >
            {/* ── CARD BACK ── */}
            {isHidden(index) && (
              <motion.div
                className="w-full h-full rounded-lg absolute z-10 flex items-center justify-center overflow-hidden"
                style={{
                  // Two-tone pink so each card has a visible edge against neighbors
                  background: "linear-gradient(145deg, #fce4ec 0%, #f48fb1 55%, #ec407a 100%)",
                  border: "none",
                  // Inset shadow creates depth so cards don't bleed into each other
                  boxShadow: "inset 0 -2px 4px rgba(173,20,87,0.2), 0 2px 6px rgba(233,30,140,0.18)",
                }}
                animate={isWrong(index) ? { x: [-4, 4, -4, 4, 0] } : {}}
                transition={{ duration: 0.4 }}
              >
                {/* Heart stamp — gives each card a focal point */}
                <span
                  style={{
                    fontSize: "clamp(16px, 2.8vh, 26px)",
                    color: "#fff",
                    opacity: 0.7,
                    filter: "drop-shadow(0 1px 2px rgba(173,20,87,0.4))",
                    userSelect: "none",
                  }}
                >
                  ♥
                </span>

                {/* Selected highlight ring */}
                {isSelected(index) && (
                  <motion.div
                    className="absolute inset-0 rounded-lg"
                    style={{ border: "3px solid #fff", boxShadow: "0 0 0 3px #e91e8c" }}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.15 }}
                  />
                )}
              </motion.div>
            )}

            {/* ── CARD FRONT (photo) ── */}
            {(isSelected(index) || isMatched(index)) && (
              <motion.div
                className="w-full h-full absolute"
                initial={{ rotateY: -180 }}
                animate={{ rotateY: 0 }}
                transition={{ duration: 0.45, ease: "easeOut" }}
                style={{ backfaceVisibility: "hidden" }}
              >
                <Image
                  src={imgs[index]}
                  alt={`Photo ${index + 1}`}
                  fill
                  className="rounded-lg object-cover"
                  style={{
                    border: isMatched(index) ? "2.5px solid #e91e8c" : "2.5px solid #f48fb1",
                    boxShadow: isMatched(index)
                      ? "0 0 0 2px #f48fb1, 0 4px 12px rgba(233,30,140,0.3)"
                      : "none",
                  }}
                />
              </motion.div>
            )}

            {/* ── WRONG SHAKE + TINT ── */}
            {isWrong(index) && (
              <motion.div
                className="absolute inset-0 rounded-lg z-20 pointer-events-none"
                style={{ background: "rgba(220,20,80,0.45)", outline: "2.5px solid #e91e8c" }}
                initial={{ x: 0, opacity: 1 }} animate={{ x: [-6, 6, -5, 5, -3, 3, 0], opacity: [1, 1, 1, 1, 1, 1, 0] }}
                transition={{ duration: 0.45, ease: "easeOut" }}
              />
            )}

            {/* ── MATCH SPARKLE ── */}
            {isMatched(index) && (
              <motion.div
                className="absolute inset-0 rounded-lg z-20 pointer-events-none flex items-center justify-center"
                initial={{ opacity: 1, scale: 0.8 }}
                animate={{ opacity: 0, scale: 1.3 }}
                transition={{ duration: 0.6 }}
              >
                <span style={{ fontSize: "clamp(14px, 2.5vh, 22px)", color: "#fff" }}>✨</span>
              </motion.div>
            )}
          </motion.div>
        ) : (
          <div key={i} className="w-full h-full" />
        )
      )}
    </div>
  );
}

"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";

export default function OrientationGuard({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isPortrait, setIsPortrait] = useState(false);

  useEffect(() => {
    const checkOrientation = () => {
      const portrait =
        window.innerHeight > window.innerWidth && window.innerWidth < 1024;
      setIsPortrait(portrait);
    };

    checkOrientation();
    window.addEventListener("resize", checkOrientation);
    return () => window.removeEventListener("resize", checkOrientation);
  }, []);

  if (isPortrait) {
    return (
      <div
        className="fixed inset-0 z-[100] flex flex-col items-center justify-center text-center p-8"
        style={{ background: "linear-gradient(135deg, #fdf0f5 0%, #fce4ec 40%, #f8bbd0 100%)" }}
      >
        <motion.div
          animate={{ rotate: [0, 90, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="mb-6"
        >
          <svg
            className="w-20 h-20"
            style={{ color: "#e91e8c" }}
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={1.5}
              d="M12 18h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z"
            />
          </svg>
        </motion.div>
        <h2 className="text-3xl font-bold mb-4" style={{ color: "#b5295e" }}>
          Rotate your device
        </h2>
        <p className="text-lg max-w-xs" style={{ color: "#c2607e" }}>
          To be able to play correctly, you need to put your phone in{" "}
          <b>landscape mode</b>.
        </p>
      </div>
    );
  }

  return <>{children}</>;
}

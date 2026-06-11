import { Playfair_Display } from "next/font/google";


const playfairDisplay = Playfair_Display({
  display: "swap",
  subsets: ["latin"],
});

export default function TextFooter() {
  return (
    <>
      {/* Left — pinned to bottom-left of the viewport */}
      <h1
        className={`fixed left-8 bottom-6 text-3xl lg:text-4xl font-bold leading-tight pointer-events-none select-none ${playfairDisplay.className}`}
        style={{ color: "#b5295e" }}
      >
        <span style={{ color: "#d4789a" }}>Match</span>
        <br />
        the photo pairs
      </h1>

      {/* Right — pinned to bottom-right of the viewport */}
      <h1
        className={`fixed right-8 bottom-6 text-3xl lg:text-4xl font-bold leading-tight text-right pointer-events-none select-none ${playfairDisplay.className}`}
        style={{ color: "#b5295e" }}
      >
        to reveal
        <br />
        <span style={{ color: "#d4789a" }}>the surprise</span>
      </h1>

      {/* Copyright — very bottom right */}
      
    </>
  );
}

import React from "react";
import ReactConfetti from "react-confetti";

type Props = {};

export default function Confetti({}: Props) {
  const { width, height } = useWindowSize();
  return (
    <ReactConfetti
      gravity={0.025}
      colors={["#1bee68", "#e70c0c"]}
      width={width}
      height={height}
      recycle={false}
      opacity={0.75}
      numberOfPieces={1000}
    />
  );
}

import { useState, useEffect } from "react";
// Usage
function App() {
  const size = useWindowSize();
  return (
    <div>
      {size.width}px / {size.height}px
    </div>
  );
}
// Hook
function useWindowSize() {
  // Initialize state with undefined width/height so server and client renders match
  // Learn more here: https://joshwcomeau.com/react/the-perils-of-rehydration/
  const [windowSize, setWindowSize] = useState<{
    width?: number;
    height?: number;
  }>({
    width: undefined,
    height: undefined,
  });
  useEffect(() => {
    // Handler to call on window resize
    function handleResize() {
      // Set window width/height to state
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    }
    // Add event listener
    window.addEventListener("resize", handleResize);
    // Call handler right away so state gets updated with initial window size
    handleResize();
    // Remove event listener on cleanup
    return () => window.removeEventListener("resize", handleResize);
  }, []); // Empty array ensures that effect is only run on mount
  return windowSize;
}

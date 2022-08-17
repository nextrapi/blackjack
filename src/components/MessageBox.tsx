import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useGame } from "@hooks/useGame";
import { v1 } from "uuid";
type Props = {};

export default function MessageBox({}: Props) {
  const { gameMessage } = useGame();

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
    },
  };

  const item = {
    hidden: { y: -5, opacity: 0, rotate: 360 },
    show: { y: 0, opacity: 1, rotate: [0,10,-10,0] },
    exit: { y: -5, opacity: 0, rotate: 360 },
  };
  const uuid = v1();
  return (
    <motion.ol
      variants={container}
      initial="hidden"
      animate="show"
      exit={"exit"}
      className="text-white font-semibold flex"
    >
      <AnimatePresence exitBeforeEnter >
        {new Array(gameMessage.length).fill(0).map((each, index) => {
          const letter = gameMessage[index];
          return (
            <motion.li
              key={`${index}-${letter}`}
              variants={item}
              initial="hidden"
              animate="show"
              exit={"exit"}
            >
              {letter !== " " ? letter : <>&nbsp;</>}
            </motion.li>
          );
        })}
      </AnimatePresence>
    </motion.ol>
  );
}

export function Character(props: Props) {
  return <div>Character</div>;
}

import { Card } from "@interfaces/card";
import React from "react";
import { motion, AnimatePresence } from "framer-motion";

interface CardComponentProps extends Card {
  show?: boolean;
}
const CardMap: {
  [key: string]: {
    symbol: React.ReactNode;
    cards: {
      [key: string]: React.ReactNode;
    };
  };
} = {
  diamonds: {
    symbol: <>&#9830;</>,
    cards: {
      A: <>&#127169;</>,
      2: <>&#127170;</>,
      3: <>&#127171;</>,
      4: <>&#127172;</>,
      5: <>&#127173;</>,
      6: <>&#127174;</>,
      7: <>&#127175;</>,
      8: <>&#127176;</>,
      9: <>&#127177;</>,
      10: <>&#127178;</>,
      J: <>&#127179;</>,
      Q: <>&#127181;</>,
      K: <>&#127182;</>,
    },
  },
  hearts: {
    symbol: <>&#9829;</>,
    cards: {
      A: <>&#127153;</>,
      2: <>&#127154;</>,
      3: <>&#127155;</>,
      4: <>&#127156;</>,
      5: <>&#127157;</>,
      6: <>&#127158;</>,
      7: <>&#127159;</>,
      8: <>&#127160;</>,
      9: <>&#127161;</>,
      10: <>&#127162;</>,
      J: <>&#127163;</>,
      Q: <>&#127165;</>,
      K: <>&#127166;</>,
    },
  },
  spades: {
    symbol: <>&#9824;</>,
    cards: {
      A: <>&#127137;</>,
      2: <>&#127138;</>,
      3: <>&#127139;</>,
      4: <>&#127140;</>,
      5: <>&#127141;</>,
      6: <>&#127142;</>,
      7: <>&#127143;</>,
      8: <>&#127144;</>,
      9: <>&#127145;</>,
      10: <>&#127146;</>,
      J: <>&#127147;</>,
      Q: <>&#127149;</>,
      K: <>&#127150;</>,
    },
  },
  clubs: {
    symbol: <>&#9827;</>,
    cards: {
      A: <>&#127185;</>,
      2: <>&#127186;</>,
      3: <>&#127187;</>,
      4: <>&#127188;</>,
      5: <>&#127189;</>,
      6: <>&#127190;</>,
      7: <>&#127191;</>,
      8: <>&#127192;</>,
      9: <>&#127193;</>,
      10: <>&#127194;</>,
      J: <>&#127195;</>,
      Q: <>&#127197;</>,
      K: <>&#127198;</>,
    },
  },
};
export default function CardComponent({
  suit,
  name,
  value,
  show = false,
}: CardComponentProps) {
  const color =
    suit === "diamonds" || suit === "hearts" ? "text-red-500" : "text-black";
  return (
    <div
      className={` ${color} font-serif bg-white m-auto
      text-[5rem] h-20 w-[3.5rem] 
      md:text-[6rem] md:h-24 md:w-16 
      lg:text-[7rem] lg:h-28 lg:w-20 
      xl:text-[8rem]  xl:w-[5.5rem] xl:h-32 rounded-md justify-center   flex items-center `}
    >
      <AnimatePresence exitBeforeEnter>
        {show && (
          <motion.div
            key={`front-${suit}-${name}`}
            initial={{ opacity: 0 }}
            animate={{ rotate: [0, 2, -2, 0], opacity: 1 }}
          >
            {CardMap[suit].cards[name]}
          </motion.div>
        )}
        {!show && (
          <motion.div
            key={`back-${suit}-${name}`}
            exit={{ opacity: 0 }}
          >
            &#127136;
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

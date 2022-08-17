import { usePlayer } from "@hooks/usePlayer";
import React, { useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import CardComponent from "./Card";
import { useDeck } from "@hooks/useDeck";
import CardTotal from "./CardTotal";
import { useGame } from "@hooks/useGame";

type Props = {};

export default function PlayerCards({}: Props) {
  const { hand, addCard, decision, isDoubleTotal, totals } = usePlayer();
  const { getCard, deck } = useDeck();
  const { setGameMessage } = useGame();

  if (hand.length == 0) return null;
  return (
    <div className="flex  py-4 space-y-5 flex-col  text-center">
      <div className="flex flex-wrap relative  justify-center space-x-2 ">
        {hand.map((card, index) => (
          <motion.div
            key={`card-${card.suit}-${card.name}`}
            layoutId={`card-${card.suit}-${card.name}`}
            id={`card-${card.suit}-${card.name}`}
           
          >
            <CardComponent {...card} show />
          </motion.div>
        ))}
      </div>
      <div>
        <CardTotal totals={totals} isDoubleTotal={isDoubleTotal} />
      </div>
    </div>
  );
}

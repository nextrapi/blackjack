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
  const addCardToHand = () => {
    addCard(getCard());
  };
  const startGame = () => {
    addCard(getCard(2));
  };
  useEffect(() => {
    switch (decision.action) {
      case "start":
        startGame();
        setGameMessage('Nice Cards!')
        break;
      case "hit":
        addCardToHand();
        setGameMessage('Nice hit!')
        break;
      default:
        break;
    }
  }, [decision]);
  if (hand.length == 0) return null;
  return (
    <div className="flex  py-4 space-y-5 flex-col  text-center">
      <div className="flex flex-wrap relative  justify-center ">
        {hand.map((card, index) => (
          <motion.div
            key={`card-${card.suit}-${card.name}`}
            layoutId={`card-${card.suit}-${card.name}`}
            initial={{ rotate: 0, scale: 0.9, opacity: 0.5 }}
            animate={{ rotate: 360, scale: [1.1, 1], opacity: 1 }}
            transition={{ duration: 1 }}
            className={` flex m-1`}
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

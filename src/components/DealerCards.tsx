import { usePlayer } from "@hooks/usePlayer";
import React, { useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import CardComponent from "./Card";
import { useDealer } from "@hooks/useDealer";
import { useDeck } from "@hooks/useDeck";
import CardTotal from "./CardTotal";

type Props = {};

export default function DealerCards({}: Props) {
  const { hand, addCard, decision, totals, isDoubleTotal } = useDealer();
  const { isStanding, isBusted, isBlackJack } = usePlayer();
  const { getCard, deck } = useDeck();
  const addCardToHand = () => {
    addCard(getCard());
  };
  const startGame = () => {
    console.log(deck.length);
    addCard(getCard(2));
  };
  useEffect(() => {
    switch (decision.action) {
      case "bet":
        startGame();
        break;
      case "hit":
        addCardToHand();
        break;
      default:
        break;
    }
  }, [decision]);
  if (hand.length == 0) return null;
  const showCard = isStanding || isBusted || isBlackJack;
  return (
    <div className="flex  py-4 space-y-5 flex-col  text-center">
      <div className="flex space-x-2 flex-wrap relative  justify-center ">
        <AnimatePresence>
          {hand.map((card, index) => (
            <motion.div
              key={`card-${card.suit}-${card.name}`}
              layoutId={`card-${card.suit}-${card.name}`}
              initial={{ rotate: 0, scale: 0.9 }}
              animate={{ rotate: 360, scale: [1.1, 1] }}
              transition={{ duration: 1 }}
            >
              <CardComponent {...card} show={index == 0 || showCard} />
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
      {showCard && (
        <div>
          <CardTotal totals={totals} isDoubleTotal={isDoubleTotal} />
        </div>
      )}
    </div>
  );
}

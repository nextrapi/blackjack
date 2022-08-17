import { useBank } from "@hooks/useBank";
import { usePlayer } from "@hooks/usePlayer";
import { AnimatePresence, AnimateSharedLayout, motion } from "framer-motion";
import React from "react";

type Props = {};

export default function BettingBoard({}: Props) {
  const { currencies, addBet, getBalanceBillCount, hasBill } = useBank();
  const { isTimeToBet } = usePlayer();
  return (
    <AnimatePresence exitBeforeEnter>
      {isTimeToBet && (
        <motion.div
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 50, scaleY: 0, opacity: 0 }}
          className="p-5 px-6 xl:p-6 rounded-xl xl:px-8 h-full m-auto bg-green-900 items-center inline-flex space-x-4  xl:space-x-5"
        >
          {currencies.map((currency) => {
            return currency.component({
              onClick: () => {
                addBet("player", currency.value);
              },
              count: getBalanceBillCount("player", currency.value),
            });
          })}
        </motion.div>
      )}
    </AnimatePresence>
  );
}

import { useBank } from "@hooks/useBank";
import { usePlayer } from "@hooks/usePlayer";
import { AnimatePresence, AnimateSharedLayout, motion } from "framer-motion";
import React from "react";
import BettingChips from "./BettingChips";
import PlayerCards from "./PlayerCards";

type Props = {};

export default function BettingBoard({}: Props) {
  const { currencies, addBet, getBalanceBillCount, getBalance } = useBank();
  return (
    <motion.div
      layout
      initial={{ y: 100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      exit={{
        y: 100,
        opacity: 0,
      }}
      key="betting-board"
      className="p-5 px-6 xl:p-6 rounded-xl xl:px-8   bg-green-800 items-center inline-flex flex-col justify-between"
    >
      <div className="space-x-4  xl:space-x-5 flex">
        {currencies.map((currency, currencyIndex) => {
          const count = getBalanceBillCount("player", currency.value);
          const hiddenChips = Array(count)
            .fill(currency.value)
            .map((bill, index) => (
              <div className={`absolute z-0 inset-0`} key={index}>
                {currency.component({
                  showCount: index == 0 ? true : false,
                  count: index == 0 ? count : undefined,
                  layoutId: `${
                    getBalance("player").bills[currency.name][index]
                  }`,
                })}
              </div>
            ));
          return (
            <div className="relative" key={currencyIndex}>
              {currency.component({
                onClick: () => {
                  addBet("player", currency.value);
                },
                count: getBalanceBillCount("player", currency.value),
              })}
              {hiddenChips}
            </div>
          );
        })}
      </div>
    </motion.div>
  );
}

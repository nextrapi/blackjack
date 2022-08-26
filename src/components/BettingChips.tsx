import { useBank } from "@hooks/useBank";
import { usePlayer } from "@hooks/usePlayer";
import _ from "lodash";
import React from "react";
import { motion } from "framer-motion";
type Props = {};

export default function BettingChips({}: Props) {
  const { currencies, getBetBillCount, removeBet, getBet } = useBank();
  return (
    <motion.div
      layout
      key="betting-chips"
      className="flex justify-center items-center h-full w-full"
    >
      {currencies.map((currency) => {
        const count = getBetBillCount("player", currency.value);
        const chips = Array(count)
          .fill(currency.value)
          .map((bill, index) => (
            <div
              key={index}
              className={`${index == 0 ? "" : "absolute"} scale-75`}
              style={{
                top: `-${index < 20 ? index * 5 : 0 * 5}px`,
                opacity: index < 20 ? 1 : 0,
              }}
            >
              {currency.component({
                onClick: () => {
                  removeBet("player", currency.value);
                },
                showCount: index == 0 ? true : false,
                count: index == 0 ? count : undefined,
                layoutId: `${getBet("player").bills[currency.name][index]}`,
              })}
            </div>
          ));
        return <div className="relative">{chips}</div>;
      })}
    </motion.div>
  );
}

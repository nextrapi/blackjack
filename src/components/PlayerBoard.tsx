import { useBank } from "@hooks/useBank";
import { usePlayer } from "@hooks/usePlayer";
import { AnimatePresence, AnimateSharedLayout, motion } from "framer-motion";
import React from "react";
import BettingBoard from "./BettingBoard";
import BettingChips from "./BettingChips";
import PlayerCards from "./PlayerCards";

type Props = {};

export default function PlayerBoard({}: Props) {
  const { isTimeToBet, notStarted } = usePlayer();
  return (
    <div className={`h-[25vh] flex p-1 justify-center flex-col items-center`}>
      <AnimatePresence exitBeforeEnter>
        {!notStarted && <BettingChips />}
        {isTimeToBet ? <BettingBoard /> : <PlayerCards />}
      </AnimatePresence>
    </div>
  );
}

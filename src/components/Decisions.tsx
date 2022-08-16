import { useDealer } from "@hooks/useDealer";
import { useDeck } from "@hooks/useDeck";
import { useGame } from "@hooks/useGame";
import { usePlayer } from "@hooks/usePlayer";
import React from "react";
import { motion, AnimatePresence } from "framer-motion";

type Props = {};

export default function Decisions({}: Props) {
  const {
    isBlackJack,
    notStarted,
    newDecision,
    isBusted,
    clear: clearPlayer,
    isStanding,
  } = usePlayer();
  const {
    newDecision: newDealerDecision,
    clear: clearDealer,
    isBusted: dealerIsBusted,
    isBlackJack: dealerIsBlackJack,
    isStanding: dealerIsStanding,
  } = useDealer();
  const { reset: resetDeck } = useDeck();
  const { isGameOver, resetGameMessage } = useGame();
  const baseButtonClass =
    " bg-gray-100 rounded-md shadow-xl  text-gray-800 text-xl font-bold uppercase disabled:bg-opacity-30  ";
  const buttonClass = baseButtonClass + "col-span-6 xl:col-span-4";
  const clearGame = () => {
    clearPlayer();
    clearDealer();
    resetDeck();
    resetGameMessage();
  };
  const disableDecisions = isGameOver || isBusted || isStanding;

  return (
    <AnimatePresence exitBeforeEnter>
      {notStarted ? (
        <motion.button
          initial={{
            opacity: 0,
            y: 200,
          }}
          animate={{
            opacity: 1,
            y: 0,
          }}
          exit={{
            opacity: 0,
            y: -20,
          }}
          key={"start-button"}
          className={`col-span-10 col-start-2 xl:col-span-8 xl:col-start-3 ${baseButtonClass}`}
          onClick={() => {
            newDecision("start");
            newDealerDecision("start");
          }}
        >
          Start Game
        </motion.button>
      ) : (
        <>
          {isGameOver ? (
            <motion.button
              initial={{
                opacity: 0,
                x: -200,
              }}
              animate={{
                opacity: 1,
                x: 0,
              }}
              exit={{
                opacity: 0,
                x: -200,
              }}
              key={"new-round-button"}
              className={buttonClass}
              onClick={() => clearGame()}
            >
              New Round
            </motion.button>
          ) : (
            <motion.button
              initial={{
                opacity: 0,
                x: -200,
              }}
              animate={{
                opacity: 1,
                x: 0,
              }}
              exit={{
                opacity: 0,
                x: -200,
              }}
              key={"hit-button"}
              disabled={disableDecisions}
              className={buttonClass}
              onClick={() => newDecision("hit")}
            >
              Hit
            </motion.button>
          )}
          <motion.button
            initial={{
              opacity: 0,
              y: 200,
            }}
            animate={{
              opacity: 1,
              y: 0,
            }}
            exit={{
              opacity: 0,
              y: 200,
            }}
            key={"stand-button"}
            disabled={disableDecisions}
            className={buttonClass}
            onClick={() => newDecision("stand")}
          >
            Stand
          </motion.button>
          <motion.button
            initial={{
              opacity: 0,
              x: 200,
            }}
            animate={{
              opacity: 1,
              x: 0,
            }}
            exit={{
              opacity: 0,
              x: 200,
            }}
            key={"double-button"}
            disabled={disableDecisions}
            className={`${buttonClass} col-start-4`}
          >
            Double
          </motion.button>
        </>
      )}
    </AnimatePresence>
  );
}

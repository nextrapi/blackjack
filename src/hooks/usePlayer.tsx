import React, { PropsWithChildren, useEffect, useState } from "react";
import { Card } from "@interfaces/card";
import _ from "lodash";
import { useDeck } from "./useDeck";
import { Balance, useBank } from "./useBank";
type Props = {};
type PlayerHand = Card[];
type PlayerDecision = {
  action: string;
  hand: Card[];
  data?: any;
};
export type PlayerContextProps = {
  hand: PlayerHand;
  addCard: (cards: Card[]) => void;
  isBlackJack: boolean;
  isBusted: boolean;
  isDoubleTotal: boolean;
  decisions: PlayerDecisions;
  decision: PlayerDecision;
  newDecision: (decision: string) => void;
  notStarted: boolean;
  totals: number[];
  isStanding: boolean;
  clear: () => void;
  setBiggerTotal: () => void;
  maxTotal: number;
  isTimeToBet: boolean;
  hasNotBet: boolean;
  currentBet: Balance;
  currentBalance: Balance;
};
type PlayerDecisions = PlayerDecision[];
export const PlayerDefault = {
  hand: [],
  addCard: (cards: Card[]) => {},
  isBlackJack: false,
  isBusted: false,
  isDoubleTotal: false,
  decisions: [],
  decision: { action: "", hand: [] },
  newDecision: (decision: string) => {},
  notStarted: true,
  totals: [],
  isStanding: false,
  clear: () => {},
  setBiggerTotal: () => {},
  maxTotal: 0,
  isTimeToBet: false,
  hasNotBet: false,
  currentBet: { total: 0, bills: {} },
  currentBalance: { total: 0, bills: {} },
};
export const PlayerContext =
  React.createContext<PlayerContextProps>(PlayerDefault);
export const playerHooks = () => {
  const [hand, setHand] = useState<PlayerHand>([]);
  const [decisions, setDecisions] = useState<PlayerDecisions>([]);
  const [decision, setDecision] = useState<PlayerDecision>({
    action: "",
    hand: [],
  });
  const [totals, setTotal] = useState<number[]>([0]);
  const clear = () => {
    setHand([]);
    setDecisions([]);
    setDecision({ action: "", hand: [] });
    setTotal([0]);
  };
  useEffect(() => {
    var totalOptions: number[] = [0, 0];
    if (hand.length > 0 && hand.every((card) => card.name === "A")) {
      totalOptions = [2, 13];
    } else {
      hand.forEach((card) => {
        totalOptions[0] += card.value[0];
        totalOptions[1] += card.value[1] || card.value[0];
      });
    }

    setTotal(totalOptions);
  }, [hand]);

  const addCard = (cards: Card[]) => {
    setHand([...hand, ...cards]);
  };
  var isDoubleTotal =
    totals.length > 1 && totals[0] !== totals[1] && totals[1] < 22;
  var isBlackJack = totals[0] === 21 || (totals.length > 1 && totals[1] === 21);
  var newDecision = (action: string) => {
    if (!isStanding) {
      setDecision({ action, hand });
      setDecisions([...decisions, { action, hand }]);
    }
  };
  const setBiggerTotal = () => {
    setTotal([_.max(totals) || 0]);
  };
  var notStarted = decisions.length === 0;
  var isTimeToBet = decision.action === "start";
  var isStanding = decision.action === "stand";
  var isBusted = totals && totals.every((total) => total > 21);
  var maxTotal = _.max(totals) || 0;
  const { getBet, getBalance } = useBank();
  const currentBet = getBet("player");
  const currentBalance = getBalance("player");
  const hasNotBet = currentBet.total === 0 && isTimeToBet;

  return {
    hand,
    addCard,
    isDoubleTotal,
    isBlackJack,
    isBusted,
    newDecision,
    decisions,
    decision,
    notStarted,
    totals,
    isStanding,
    clear,
    setBiggerTotal,
    maxTotal,
    isTimeToBet,
    hasNotBet,
    currentBet,
    currentBalance,
  };
};
export const usePlayer = () => React.useContext(PlayerContext);
export default function PlayerProvider({ children }: PropsWithChildren<Props>) {
  const player = playerHooks();

  return (
    <PlayerContext.Provider value={player}>{children}</PlayerContext.Provider>
  );
}

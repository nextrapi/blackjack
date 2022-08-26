import Confetti from "@components/Confetti";
import {
  createContext,
  PropsWithChildren,
  useContext,
  useEffect,
  useState,
} from "react";
import { useBank } from "./useBank";
import { useDealer } from "./useDealer";
import { useDeck } from "./useDeck";
import { usePlayer } from "./usePlayer";

export const GameContext = createContext<{
  isGameOver: boolean;
  gameMessage: string;
  setGameMessage: (message: string) => void;
  resetGameMessage: () => void;
}>({
  isGameOver: false,
  gameMessage: "",
  setGameMessage: (message: string) => {},
  resetGameMessage: () => {},
});
export const useGame = () => useContext(GameContext);
export const GameProvider = ({ children }: PropsWithChildren<{}>) => {
  const player = usePlayer();
  const { getCard, deck } = useDeck();
  const bank = useBank();
  const dealer = useDealer();
  const isGameBusted = player.isBusted || dealer.isBusted;
  const isGameBlackJack =
    player.isBlackJack || (player.isStanding && dealer.isBlackJack);
  const IsGameStanding = player.isStanding && dealer.isStanding;
  const isGameOver = isGameBusted || isGameBlackJack || IsGameStanding;
  const isDealerHigher = dealer.maxTotal > player.maxTotal;
  const dealerWon =
    (isGameOver && isDealerHigher && !dealer.isBusted) ||
    dealer.isBlackJack ||
    player.isBusted;
  const firstMessage = "Let's Play!";
  const [gameMessage, _setGameMessage] = useState<string>(firstMessage);
  useEffect(() => {
    if (dealerWon) {
      if (dealer.isBlackJack) {
        setGameMessage("Dealer Won with a BlackJack!");
      } else if (player.isBusted) {
        setGameMessage("You Busted!");
      } else {
        setGameMessage("Dealer Won!");
      }
    } else if (isGameOver) {
      if (player.isBlackJack) {
        setGameMessage("You Won with a BlackJack!");
      } else if (dealer.isBusted) {
        setGameMessage("You Won with a Busted Dealer!");
      } else {
        if (player.maxTotal === player.maxTotal) {
          setGameMessage("It's a Tie!");
        } else {
          setGameMessage("You Won!");
        }
      }
    }
    if (dealer.isDoubleTotal) {
      dealer.setBiggerTotal();
    }
    if (player.isDoubleTotal) {
      player.setBiggerTotal();
    }
  }, [isGameOver]);
  useEffect(() => {
    switch (player.decision.action) {
      case "bet":
        dealer.newDecision("bet");
        player.addCard(getCard(2));
        setGameMessage("Nice Cards!");
        break;
      case "hit":
        player.addCard(getCard());
        setGameMessage("Nice hit!");
        break;
      default:
        break;
    }
  }, [player.decision]);
  useEffect(() => {
    switch (dealer.decision.action) {
      case "bet":
        bank.copyBet("player", "dealer");
        dealer.addCard(getCard(2));
        break;
      case "hit":
        dealer.addCard(getCard());
        break;
      default:
        break;
    }
  }, [dealer.decision]);
  const setGameMessage = (message: string) => {
    if (message !== gameMessage) {
      _setGameMessage(message);
    }
  };
  const resetGameMessage = () => setGameMessage(firstMessage);
  return (
    <GameContext.Provider
      value={{ isGameOver, gameMessage, setGameMessage, resetGameMessage }}
    >
      {player.isBlackJack && <Confetti />}
      {children}
    </GameContext.Provider>
  );
};

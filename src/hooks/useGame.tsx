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
  const {
    isBlackJack,
    isBusted,
    isStanding,
    isDoubleTotal,
    setBiggerTotal,
    maxTotal,
    decision,
    addCard,
  } = usePlayer();
  const { getCard, deck } = useDeck();
  const { addToBet, bank } = useBank();
  const {
    isBusted: dealerIsBusted,
    isBlackJack: dealerIsBlackJack,
    isStanding: dealerIsStanding,
    isDoubleTotal: dealerIsDoubleTotal,
    setBiggerTotal: dealerSetBiggerTotal,
    maxTotal: dealerMaxTotal,
  } = useDealer();
  const isGameBusted = isBusted || dealerIsBusted;
  const isGameBlackJack = isBlackJack || (isStanding && dealerIsBlackJack);
  const IsGameStanding = isStanding && dealerIsStanding;
  const isGameOver = isGameBusted || isGameBlackJack || IsGameStanding;
  const isDealerHigher = dealerMaxTotal > maxTotal;
  const dealerWon =
    (isGameOver && isDealerHigher && !dealerIsBusted) ||
    dealerIsBlackJack ||
    isBusted;
  const firstMessage = "Let's Play!";
  const [gameMessage, _setGameMessage] = useState<string>(firstMessage);
  useEffect(() => {
    if (dealerWon) {
      if (dealerIsBlackJack) {
        setGameMessage("Dealer Won with a BlackJack!");
      } else if (isBusted) {
        setGameMessage("You Busted!");
      } else {
        setGameMessage("Dealer Won!");
      }
    } else if (isGameOver) {
      if (isBlackJack) {
        setGameMessage("You Won with a BlackJack!");
      } else if (dealerIsBusted) {
        setGameMessage("You Won with a Busted Dealer!");
      } else {
        if (maxTotal === dealerMaxTotal) {
          setGameMessage("It's a Tie!");
        } else {
          setGameMessage("You Won!");
        }
      }
    }
    if (dealerIsDoubleTotal) {
      dealerSetBiggerTotal();
    }
    if (isDoubleTotal) {
      setBiggerTotal();
    }
  }, [isGameOver]);
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
        setGameMessage("Nice Cards!");
        break;
      case "hit":
        addCardToHand();
        setGameMessage("Nice hit!");
        break;
      case "bet":
        addToBet("player", decision.data);
        addToBet("dealer", decision.data);
        break;
      default:
        break;
    }
  }, [decision]);

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
      {isBlackJack && <Confetti />}
      {JSON.stringify(bank)}
      {children}
    </GameContext.Provider>
  );
};

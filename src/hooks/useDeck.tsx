import React, { PropsWithChildren, useState } from "react";
import { Card } from "@interfaces/card";

type Props = {};

type Deck = Card[];
export const DeckContext = React.createContext<{
  deck: Deck;
  getCard: (count?: number) => Card[];
  reset: () => void;
}>({
  deck: [],
  getCard: () => [{ name: "", value: [0], suit: "" }],
  reset: () => {},
});
export const useDeck = () => React.useContext(DeckContext);
export default function DeckProvider({ children }: PropsWithChildren<Props>) {
  var suits = ["spades", "diamonds", "clubs", "hearts"];
  var names = [
    "A",
    "2",
    "3",
    "4",
    "5",
    "6",
    "7",
    "8",
    "9",
    "10",
    "J",
    "Q",
    "K",
  ];
  const generateDeck = () => {
    var deck = [];
    for (var i = 0; i < suits.length; i++) {
      for (var j = 0; j < names.length; j++) {
        deck.push({
          suit: suits[i],
          name: names[j],
          value:
            names[j] == "A"
              ? [1, 11]
              : names[j] == "J" || names[j] == "Q" || names[j] == "K"
              ? [10]
              : [Number(names[j])],
        });
      }
    }
    return deck;
  };
  const [deck, setDeck] = useState<Deck>(generateDeck());
  const getCard = (count = 1) => {
    var cards = [];
    var temp = [...deck];
    for (var i = 0; i < count; i++) {
      var index = Math.floor(Math.random() * temp.length);
      cards.push(temp.splice(index, 1)[0]);
    }
    setDeck(temp);
    return cards;
  };
  const reset = () => {
    setDeck(generateDeck());
  };
  return (
    <DeckContext.Provider value={{ deck, getCard, reset }}>
      {children}
    </DeckContext.Provider>
  );
}

import React, { PropsWithChildren, useEffect, useState } from "react";
import { useDeck } from "./useDeck";
import {
  PlayerContextProps,
  PlayerDefault,
  playerHooks,
  usePlayer,
} from "./usePlayer";
interface DealerContextProps extends PlayerContextProps {}
export const DealerContext = React.createContext<DealerContextProps>({
  ...PlayerDefault,
});
export const useDealer = () => React.useContext(DealerContext);
export default function DealerProvider({ children }: PropsWithChildren<{}>) {
  const dealer = playerHooks();
  const player = usePlayer();
  const { getCard, deck } = useDeck();
  var shouldDealerStand =
    dealer.totals[0] >= 17 || (dealer.isDoubleTotal && dealer.totals[1] >= 17);
  const getDealerCard = () => {
    setTimeout(() => {
      if (player.isStanding && !dealer.isBusted && !shouldDealerStand) {
        dealer.newDecision("hit");
      } else {
        if (shouldDealerStand) {
          dealer.newDecision("stand");
        }
      }
    }, 1000);
  };
  useEffect(getDealerCard, [player.isStanding]);
  useEffect(getDealerCard, [dealer.totals]);
  console.log(dealer);
  console.log(player);
  return (
    <DealerContext.Provider
      value={{
        ...dealer,
      }}
    >
      {children}
    </DealerContext.Provider>
  );
}

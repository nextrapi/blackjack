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

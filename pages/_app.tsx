import "../src/styles/globals.css";
import type { AppProps } from "next/app";
import PlayerProvider from "@hooks/usePlayer";
import DeckProvider from "@hooks/useDeck";
import DealerProvider from "@hooks/useDealer";
import { GameProvider } from "@hooks/useGame";
import Confetti from "@components/Confetti";
import BankProvider from "@hooks/useBank";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <link rel="icon" href="/favicon.ico" />
      <DeckProvider>
        <BankProvider>
          <PlayerProvider>
            <DealerProvider>
              <GameProvider>
                <Component {...pageProps} />
              </GameProvider>
            </DealerProvider>
          </PlayerProvider>
        </BankProvider>
      </DeckProvider>
    </>
  );
}

export default MyApp;

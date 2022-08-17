import BettingBoard from "@components/BettingBoard";
import DealerCards from "@components/DealerCards";
import Decisions from "@components/Decisions";
import Deck from "@components/Deck";
import MessageBox from "@components/MessageBox";
import PlayerCards from "@components/PlayerCards";
import { useBank } from "@hooks/useBank";
import { useDealer } from "@hooks/useDealer";
import { useDeck } from "@hooks/useDeck";
import { useGame } from "@hooks/useGame";
import { usePlayer } from "@hooks/usePlayer";
import type { NextPage } from "next";
import Head from "next/head";
import Image from "next/image";
import { useEffect, useState } from "react";

const Home: NextPage = () => {
  const [arr1, setArr1] = useState([
    {
      suit: "hearts",
      name: "A",
    },
    {
      suit: "hearts",
      name: "K",
    },
    {
      suit: "hearts",
      name: "Q",
    },
  ]);
  const [arr2, setArr2] = useState([]);
  return (
    <>
      <Head>
        <title>Black Jack Game</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className="h-screen  overflow-hidden bg-green-700 flex flex-col  justify-between">
        <div className="h-[10%] bg-gray-800 bg-opacity-50 flex justify-around items-center">
          <MessageBox />
        </div>
        <div className="h-[20%] flex justify-center items-start">
          <DealerCards />
        </div>
        <div className="h-[20%] flex  items-center">
          <Deck />
        </div>
        <div className="h-[20%] flex justify-center items-end">
          <PlayerCards />
        </div>
        <div className="h-[15%] flex p-1">
          <BettingBoard />
        </div>
        <div className="h-[15%] p-5 xl:p-10 grid grid-cols-12 gap-5 w-full bg-green-800  bottom-0">
          <Decisions />
        </div>
      </div>
    </>
  );
};

export default Home;

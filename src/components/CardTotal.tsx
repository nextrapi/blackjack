import { PlayerContextProps } from "@hooks/usePlayer";
import React from "react";

type Props = {};

export default function CardTotal({
  totals,
  isDoubleTotal,
}: {
  totals: PlayerContextProps["totals"];
  isDoubleTotal: PlayerContextProps["isDoubleTotal"];
}) {
  return (
    <span className="bg-gray-800 rounded-lg bg-opacity-70 text-gray-100 p-2">
      {totals[0]}
      {isDoubleTotal && `, ${totals[1]}`}
    </span>
  );
}

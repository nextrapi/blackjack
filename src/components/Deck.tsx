import { useDeck } from "@hooks/useDeck";
import React from "react";
import CardComponent from "@components/Card";
import { motion, AnimatePresence } from "framer-motion";

type Props = {};

export default function Deck({}: Props) {
  const { deck } = useDeck();
  return (
    <div className="  relative h-24 md:h-28 lg:h-32 xl:h-36 my-auto">
      {deck.map((card, index) => (
        <motion.div
          layoutId={`card-${card.suit}-${card.name}`}
          className={`absolute  top-0 bottom-0 `}
        >
          <style
            dangerouslySetInnerHTML={{
              __html: `
              
                .card-left-${index} { left: ${5.25 * index}px; }
              
              @media (min-width: 768px) {
                .card-left-${index} { left: ${6.25 * index}px; }
              }
              @media (min-width: 1024px) {
                .card-left-${index} { left: ${7.25 * index}px; }
              }
              @media (min-width: 1280px) {
                .card-left-${index} { left: ${8.25 * index}px; }
            }
     `,
            }}
          ></style>
          <CardComponent key={`card-${card.suit}-${card.name}`} {...card} />
        </motion.div>
      ))}
    </div>
  );
}

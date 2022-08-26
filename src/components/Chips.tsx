import React, { PropsWithChildren } from "react";
import { motion } from "framer-motion";
type Props = {
  className?: string;
  onClick?: () => void;
  count?: number;
  showCount?: boolean;
  layoutId?: string;
};

export function Chip({
  className,
  children,
  onClick,
  count = 0,
  showCount = true,
  layoutId,
}: PropsWithChildren<Props>) {
  const disabled = showCount && count === 0;
  return (
    <motion.button
      whileHover={{
        y: [-2, 0, 2, 0, -2],
        transition: { repeat: Infinity, bounce: 1, duration: 1 },
      }}
      whileTap={{
        scale: 1.15,
      }}
      onClick={onClick}
      className={`${className} ${
        disabled ? "opacity-50" : ""
      } w-12 h-12 md:w-14 md:h-14  cursor-pointer rounded-full border-dashed border-4 relative select-none border-white flex  z-10`}
      layoutId={layoutId}
      id={layoutId}
    >
      <div className="border-2 border-dashed flex rounded-full w-8 h-8 md:w-10 md:h-10 m-auto">
        <span className="m-auto text-white font-semibold text-xs md:text-sm">
          {children}
        </span>
      </div>
      {showCount && (
        <div className="bg-gray-800 absolute bg-opacity-75 rounded-full p-1 -bottom-3 -left-3 text-white text-xs scale-95">
          {count}x
        </div>
      )}
    </motion.button>
  );
}

export const GreenChip = (props: React.ComponentProps<typeof Chip>) => (
  <Chip {...props} className="bg-purple-800">
    5
  </Chip>
);
export const BlueChip = (props: React.ComponentProps<typeof Chip>) => (
  <Chip {...props} className="bg-blue-500">
    10
  </Chip>
);

export const RedChip = (props: React.ComponentProps<typeof Chip>) => (
  <Chip {...props} className="bg-red-500">
    50
  </Chip>
);

export const YellowChip = (props: React.ComponentProps<typeof Chip>) => (
  <Chip {...props} className="bg-yellow-600">
    100
  </Chip>
);
export const BlackChip = (props: React.ComponentProps<typeof Chip>) => (
  <Chip {...props} className="bg-gray-800">
    500
  </Chip>
);

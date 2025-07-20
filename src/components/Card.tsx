import React from 'react';
import type { MemoryCard } from '../types/card';

interface CardProps {
  card: MemoryCard;
  onClick: () => void;
}

const Card: React.FC<CardProps> = ({ card, onClick }) => {
  return (
    <button
      onClick={onClick}
      disabled={card.flipped || card.matched}
      className={`w-24 h-32 sm:w-28 sm:h-36 flex items-center justify-center text-4xl font-bold rounded shadow-md transition-transform duration-300 ${
        card.flipped || card.matched
          ? 'bg-white text-black'
          : 'bg-blue-600 text-transparent'
      }`}
    >
      {card.value}
    </button>
  );
};

export default Card;

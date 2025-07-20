import React from 'react';
import type { MemoryCard } from '../types/card';

interface CardProps {
  card: MemoryCard;
  onClick: () => void;
}

const Card: React.FC<CardProps> = ({ card, onClick }) => {
  const isFlipped = card.flipped || card.matched;

  return (
    <button
      onClick={onClick}
      disabled={isFlipped}
      className="w-24 h-32 sm:w-28 sm:h-36 perspective"
    >
      <div
        className={`relative w-full h-full transition-transform duration-500 transform-style-preserve-3d ${
          isFlipped ? 'rotate-y-180' : ''
        }`}
      >
        {/* Back of the card (blue side — default view) */}
        <div className="absolute inset-0 flex items-center justify-center bg-blue-600 text-transparent rounded shadow-md backface-hidden">
          ❓
        </div>

        {/* Front of the card (emoji face — shown when flipped) */}
        <div className="absolute inset-0 flex items-center justify-center text-4xl bg-white text-black rounded shadow-md backface-hidden rotate-y-180">
          {card.value}
        </div>
      </div>
    </button>
  );
};

export default Card;

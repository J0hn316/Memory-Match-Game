import React, { useState, useEffect, useRef } from 'react';
import { createShuffledDeck } from '../utils/shuffle';
import type { MemoryCard } from '../types/card';
import Card from './Card';

const GameBoard: React.FC = () => {
  const [cards, setCards] = useState<MemoryCard[]>([]);
  const [firstCard, setFirstCard] = useState<MemoryCard | null>(null);
  const [secondCard, setSecondCard] = useState<MemoryCard | null>(null);
  const [turns, setTurns] = useState(0);
  const [isBusy, setIsBusy] = useState(false);
  const winRef = useRef<HTMLDivElement>(null);

  const hasWon = cards.length > 0 && cards.every((card) => card.matched);

  useEffect(() => {
    setCards(createShuffledDeck());
  }, []);

  useEffect(() => {
    if (firstCard && secondCard) {
      setIsBusy(true);
      const timeout = setTimeout(() => {
        const isMatch = firstCard.value === secondCard.value;

        const updated = cards.map((c) => {
          if (c.id === firstCard.id || c.id === secondCard.id) {
            return isMatch ? { ...c, matched: true } : { ...c, flipped: false };
          }
          return c;
        });

        setCards(updated);
        setFirstCard(null);
        setSecondCard(null);
        setTurns((t) => t + 1);
        setIsBusy(false);
      }, 1000);

      return () => clearTimeout(timeout);
    }
  }, [firstCard, secondCard, cards]);

  useEffect(() => {
    if (hasWon && winRef.current) {
      winRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [hasWon]);

  const handleCardClick = (card: MemoryCard) => {
    if (isBusy || card.flipped || card.matched || firstCard === card) return;

    const updated = cards.map((c) =>
      c.id === card.id ? { ...c, flipped: true } : c
    );
    setCards(updated);

    if (!firstCard) {
      setFirstCard(card);
    } else if (!secondCard) {
      setSecondCard(card);
    }
  };

  const handleReset = () => {
    setCards(createShuffledDeck());
    setFirstCard(null);
    setSecondCard(null);
    setTurns(0);
    setIsBusy(false);
  };

  return (
    <div className="text-center mt-8">
      <div className="mb-4">
        <p className="text-lg font-medium text-gray-700">Turns: {turns}</p>
        {hasWon && (
          <button
            onClick={handleReset}
            className="mt-2 bg-gray-500 hover:bg-gray-600 text-white px-4 py-2 rounded"
          >
            Restart Game
          </button>
        )}
      </div>

      {hasWon && (
        <div
          ref={winRef}
          className="mb-4 p-4 bg-green-100 text-green-800 rounded shadow-md text-xl font-semibold"
        >
          🎉 You Win! Great memory!
        </div>
      )}

      <div className="grid grid-cols-4 gap-4 justify-center max-w-3xl mx-auto">
        {cards.map((card) => (
          <Card
            key={card.id}
            card={card}
            onClick={() => handleCardClick(card)}
          />
        ))}
      </div>
    </div>
  );
};

export default GameBoard;

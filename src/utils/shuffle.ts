import type { MemoryCard } from '../types/card';

const baseEmojis = ['🐶', '🐱', '🦊', '🐸', '🐵', '🐼', '🦁', '🐷'];

export function createShuffleDeck(): MemoryCard[] {
  const pairedEmojis = [...baseEmojis, ...baseEmojis];

  const shuffled = pairedEmojis
    .sort(() => Math.random() - 0.5)
    .map((value, index) => ({
      id: index,
      value,
      matched: false,
      flipped: false,
    }));

  return shuffled;
}

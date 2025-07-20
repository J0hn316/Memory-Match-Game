export interface MemoryCard {
  id: number; // unique instance ID
  value: string; // emoji or image identifier
  matched: boolean; // has it been matched?
  flipped: boolean; // is it currently face-up?
}

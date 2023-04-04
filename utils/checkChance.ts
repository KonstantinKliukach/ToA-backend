export interface Chance {
  min: number;
  max: number;
}

export default function checkChance(num: number, chance: Chance): boolean {
  return num >= chance.min && num <= chance.max;
}

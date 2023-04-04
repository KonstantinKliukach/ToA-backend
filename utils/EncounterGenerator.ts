import { ENCOUNTER_CHANCE } from './consts';
import DiceRoller from './DiceRoller';

class EncounterGenerator {
  private chance: number;
  constructor(chance: number) {
    this.chance = chance;
  }
  private rollEncounter() {
    return DiceRoller.rollD20();
  }
  private generateEncounter() {
    return DiceRoller.rollD100();
  }
  checkRandomEncounter(): number | null {
    if (this.rollEncounter() >= this.chance) {
      return this.generateEncounter();
    } else {
      return null;
    }
  }
}

export default new EncounterGenerator(ENCOUNTER_CHANCE);

import getRandomInt from "./getRandomInt";

class DiceRoller {
  static rollD20() {
    return getRandomInt(1, 20);
  }
  static rollD100() {
    return getRandomInt(1, 100);
  }
}

export default DiceRoller;

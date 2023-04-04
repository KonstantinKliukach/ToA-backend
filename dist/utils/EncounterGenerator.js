"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const consts_1 = require("./consts");
const DiceRoller_1 = __importDefault(require("./DiceRoller"));
class EncounterGenerator {
    constructor(chance) {
        this.chance = chance;
    }
    rollEncounter() {
        return DiceRoller_1.default.rollD20();
    }
    generateEncounter() {
        return DiceRoller_1.default.rollD100();
    }
    checkRandomEncounter() {
        if (this.rollEncounter() >= this.chance) {
            return this.generateEncounter();
        }
        else {
            return null;
        }
    }
}
exports.default = new EncounterGenerator(consts_1.ENCOUNTER_CHANCE);

"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.addDayOfAdventures = exports.getDaysOfAdventures = void 0;
const dayOfAdventure_1 = __importDefault(require("../models/dayOfAdventure"));
const EncounterGenerator_1 = __importDefault(require("../utils/EncounterGenerator"));
const WeatherGenerator_1 = __importDefault(require("../utils/WeatherGenerator"));
const getDaysOfAdventures = (req, res) => {
    dayOfAdventure_1.default.find()
        .sort({ dayNum: 'desc' })
        .then((days) => {
        res.send(days);
    })
        .catch((err) => {
        console.log(err);
    });
};
exports.getDaysOfAdventures = getDaysOfAdventures;
const addDayOfAdventures = (req, res) => {
    const newDay = new dayOfAdventure_1.default({
        dayNum: req.body.dayNum,
        weather: {
            pm: WeatherGenerator_1.default.generateWeather(),
            am: WeatherGenerator_1.default.generateWeather(),
        },
        encounters: {
            morning: EncounterGenerator_1.default.checkRandomEncounter(),
            day: EncounterGenerator_1.default.checkRandomEncounter(),
            evening: EncounterGenerator_1.default.checkRandomEncounter(),
        },
    });
    newDay
        .save()
        .then((result) => {
        res.send(result);
    })
        .catch((err) => {
        console.log(err);
    });
};
exports.addDayOfAdventures = addDayOfAdventures;

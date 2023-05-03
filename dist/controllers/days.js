"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.addDayOfAdventure = exports.addNoteToDayOfAdventure = exports.getDayOfAdventure = exports.getDaysOfAdventure = void 0;
const dayOfAdventure_1 = __importDefault(require("../models/dayOfAdventure"));
const EncounterGenerator_1 = __importDefault(require("../utils/EncounterGenerator"));
const WeatherGenerator_1 = __importDefault(require("../utils/WeatherGenerator"));
const getDaysOfAdventure = (req, res) => {
    dayOfAdventure_1.default.find()
        .sort({ dayNum: 'desc' })
        .then((days) => {
        res.send(days);
    })
        .catch((err) => {
        console.log(err);
    });
};
exports.getDaysOfAdventure = getDaysOfAdventure;
const getDayOfAdventure = (req, res) => {
    const { id } = req.params;
    dayOfAdventure_1.default.findOne({
        _id: id,
    })
        .then((day) => {
        res.send(day);
    })
        .catch((err) => {
        console.log(err);
    });
};
exports.getDayOfAdventure = getDayOfAdventure;
const addNoteToDayOfAdventure = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id, notes } = req.params;
    yield dayOfAdventure_1.default.findOneAndUpdate({ _id: id }, { notes });
    try {
        const day = dayOfAdventure_1.default.findOne({ _id: id });
        res.send(day);
    }
    catch (error) {
        console.log(error);
    }
});
exports.addNoteToDayOfAdventure = addNoteToDayOfAdventure;
const addDayOfAdventure = (req, res) => {
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
exports.addDayOfAdventure = addDayOfAdventure;

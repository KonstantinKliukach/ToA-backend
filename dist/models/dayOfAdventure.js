"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.dayOfAdventureSchema = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const Schema = mongoose_1.default.Schema;
exports.dayOfAdventureSchema = new Schema({
    dayNum: {
        type: Number,
        required: true,
    },
    weather: {
        pm: {
            weather: String,
        },
        am: {
            weather: String,
        },
    },
    encounters: {
        morning: Number,
        day: Number,
        evening: Number,
    },
});
const DayOfAdventureModel = mongoose_1.default.model('DayOfAdventure', exports.dayOfAdventureSchema);
exports.default = DayOfAdventureModel;

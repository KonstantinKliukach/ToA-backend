"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Weather = void 0;
const checkChance_1 = __importDefault(require("./checkChance"));
const DiceRoller_1 = __importDefault(require("./DiceRoller"));
var Seasons;
(function (Seasons) {
    Seasons[Seasons["Autumn"] = 0] = "Autumn";
    Seasons[Seasons["Winter"] = 1] = "Winter";
    Seasons[Seasons["Spring"] = 2] = "Spring";
    Seasons[Seasons["Summer"] = 3] = "Summer";
})(Seasons || (Seasons = {}));
const autumn = {
    clear: {
        chance: {
            min: 17,
            max: 20,
        },
        description: "без осадков",
        variants: [
            {
                chance: {
                    min: 1,
                    max: 6,
                },
                description: "ясно",
            },
            {
                chance: {
                    min: 7,
                    max: 14,
                },
                description: "облачно",
            },
            {
                chance: {
                    min: 15,
                    max: 20,
                },
                description: "туман",
            },
        ],
    },
    precipitation: {
        chance: {
            min: 1,
            max: 16,
        },
        description: "осадки",
        variants: [
            {
                chance: {
                    min: 1,
                    max: 12,
                },
                description: "лёгкий дождь",
            },
            {
                chance: {
                    min: 13,
                    max: 20,
                },
                description: "сильный дождь",
                variants: [
                    {
                        chance: {
                            min: 1,
                            max: 12,
                        },
                        description: "тропический ливень",
                    },
                    {
                        chance: {
                            min: 13,
                            max: 20,
                        },
                        description: "шторм",
                    },
                ],
            },
        ],
    },
};
const seasons = [autumn];
class WeatherGenerator {
    generateWeather(seasonNum = Seasons.Autumn) {
        return {
            weather: this.getWeatherFromSeason(seasons[seasonNum]),
        };
    }
    getWeatherFromSeason(season) {
        const roll = DiceRoller_1.default.rollD20();
        if ((0, checkChance_1.default)(roll, season.clear.chance)) {
            return this.getWeather(season.clear);
        }
        return this.getWeather(season.precipitation);
    }
    getWeather(weather) {
        if (!weather.variants) {
            return weather.description;
        }
        const roll = DiceRoller_1.default.rollD20();
        const variant = weather.variants.find((weather) => (0, checkChance_1.default)(roll, weather.chance));
        if (!variant) {
            throw new Error("Не найден вариант погоды");
        }
        return this.getWeather(variant);
    }
}
class Weather {
    constructor(weather) {
        this.weather = weather;
    }
}
exports.Weather = Weather;
exports.default = new WeatherGenerator();

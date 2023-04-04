import type { Chance } from "./checkChance";
import checkChance from "./checkChance";
import DiceRoller from "./DiceRoller";

enum Seasons {
  Autumn,
  Winter,
  Spring,
  Summer,
}

interface WeatherType {
  chance: Chance;
  description: string;
  variants?: WeatherType[];
}

interface Season {
  clear: WeatherType;
  precipitation: WeatherType;
}

const autumn: Season = {
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

const seasons: Season[] = [autumn];

class WeatherGenerator {
  generateWeather(seasonNum: Seasons = Seasons.Autumn): Weather {
    return {
      weather: this.getWeatherFromSeason(seasons[seasonNum]),
    };
  }
  private getWeatherFromSeason(season: Season): string {
    const roll = DiceRoller.rollD20();
    if (checkChance(roll, season.clear.chance)) {
      return this.getWeather(season.clear);
    }
    return this.getWeather(season.precipitation);
  }

  private getWeather(weather: WeatherType): string {
    if (!weather.variants) {
      return weather.description;
    }
    const roll = DiceRoller.rollD20();
    const variant = weather.variants.find((weather) =>
      checkChance(roll, weather.chance)
    );
    if (!variant) {
      throw new Error("Не найден вариант погоды");
    }
    return this.getWeather(variant);
  }
}

export class Weather {
  weather: string;
  constructor(weather: string) {
    this.weather = weather;
  }
}

export default new WeatherGenerator();

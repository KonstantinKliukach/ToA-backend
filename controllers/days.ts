import DayOfAdventureModel, { DayOfAdventure } from '../models/dayOfAdventure';

import { Request, Response } from 'express';
import EncounterGenerator from '../utils/EncounterGenerator';
import WeatherGenerator from '../utils/WeatherGenerator';

export const getDaysOfAdventures = (req: Request, res: Response) => {
  DayOfAdventureModel.find()
    .sort({ dayNum: 'desc' })
    .then((days: DayOfAdventure[]) => {
      res.send(days);
    })
    .catch((err: Error) => {
      console.log(err);
    });
};

export const addDayOfAdventures = (
  req: Request<{ dayNum: number }>,
  res: Response
) => {
  const newDay = new DayOfAdventureModel({
    dayNum: req.body.dayNum as number,
    weather: {
      pm: WeatherGenerator.generateWeather(),
      am: WeatherGenerator.generateWeather(),
    },
    encounters: {
      morning: EncounterGenerator.checkRandomEncounter(),
      day: EncounterGenerator.checkRandomEncounter(),
      evening: EncounterGenerator.checkRandomEncounter(),
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

import DayOfAdventureModel, { DayOfAdventure } from '../models/dayOfAdventure';

import { Request, Response } from 'express';
import EncounterGenerator from '../utils/EncounterGenerator';
import WeatherGenerator from '../utils/WeatherGenerator';

export const getDaysOfAdventure = (req: Request, res: Response) => {
  DayOfAdventureModel.find()
    .sort({ dayNum: 'desc' })
    .then((days: DayOfAdventure[]) => {
      res.send(days);
    })
    .catch((err: Error) => {
      console.log(err);
    });
};

export const getDayOfAdventure = (
  req: Request<{ id: string }>,
  res: Response
) => {
  const { id } = req.params;
  DayOfAdventureModel.findOne({
    _id: id,
  })
    .then((day) => {
      res.send(day);
    })
    .catch((err: Error) => {
      console.log(err);
    });
};

export const addNoteToDayOfAdventure = async (
  req: Request<{ id: string; notes: string }>,
  res: Response
) => {
  const { id, notes } = req.params;
  await DayOfAdventureModel.findOneAndUpdate({ _id: id }, { notes });
  try {
    const day = DayOfAdventureModel.findOne({ _id: id });
    res.send(day);
  } catch (error) {
    console.log(error);
  }
};

export const addDayOfAdventure = (
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

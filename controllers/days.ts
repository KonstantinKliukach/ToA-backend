import DayOfAdventureModel, { DayOfAdventure } from '../models/dayOfAdventure';

import { Request, Response } from 'express';
import EncounterGenerator from '../utils/EncounterGenerator';
import WeatherGenerator from '../utils/WeatherGenerator';

interface Filters {
  onlyWithNotes?: boolean;
}

export const getDaysOfAdventure = async (
  req: Request<{}, {}, {}, Filters>,
  res: Response
) => {
  const query = DayOfAdventureModel.find();
  query.sort({ dayNum: 'desc' });
  if (req.query.onlyWithNotes) {
    query.where('notes').exists(true);
  }
  try {
    const days = await query.exec();
    res.send(days);
  } catch (error) {
    console.log(error);
  }
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
  req: Request<{ id: string }, {}, { notes: string }>,
  res: Response
) => {
  const { id } = req.params;
  const { notes } = req.body;
  const day = await DayOfAdventureModel.findOneAndUpdate(
    { _id: id },
    { notes },
    { new: true }
  );
  res.send(day);
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

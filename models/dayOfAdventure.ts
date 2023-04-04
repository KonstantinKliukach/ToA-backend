import mongoose from 'mongoose';
import { Weather } from '../utils/WeatherGenerator';

const Schema = mongoose.Schema;

export interface DayOfAdventure {
  weather: { pm: Weather; am: Weather };
  encounters: {
    morning: number | null;
    day: number | null;
    evening: number | null;
  };
  dayNum: number;
}

export const dayOfAdventureSchema = new Schema<DayOfAdventure>({
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

const DayOfAdventureModel = mongoose.model(
  'DayOfAdventure',
  dayOfAdventureSchema
);

export default DayOfAdventureModel;

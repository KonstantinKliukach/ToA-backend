import express, { Express, Request, Response } from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import mongoose from 'mongoose';

import daysRouter from './routers/daysRouter';
import { API } from './utils/consts';
import bodyParser from 'body-parser';

const envFileName = `.env.${process.env.NODE_ENV || 'development'}`;

dotenv.config({
  path: envFileName,
});

const app: Express = express();
const port = process.env.PORT;

app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(`${API}`, daysRouter);

mongoose
  .connect(process.env.MONGO as string)
  .then(() => {
    app.listen(port, () => {
      console.log(`[server]: Server is running at http://localhost:${port}`);
    });
  })
  .catch((err) => {
    console.log(err);
  });

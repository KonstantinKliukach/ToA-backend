import express from 'express';

import * as daysController from '../controllers/days';

const router = express.Router();

router.get(`/days`, daysController.getDaysOfAdventure);

router.get(`/days/:id`, daysController.getDayOfAdventure);

router.post(`/days/:id`, daysController.addNoteToDayOfAdventure);

router.post(`/days`, daysController.addDayOfAdventure);

export default router;

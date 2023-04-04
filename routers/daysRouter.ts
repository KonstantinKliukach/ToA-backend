import express from 'express';

import * as daysController from '../controllers/days';

const router = express.Router();

router.get(`/days`, daysController.getDaysOfAdventures);

router.post(`/days`, daysController.addDayOfAdventures);

export default router;

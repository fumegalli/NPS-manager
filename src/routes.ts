import { Router } from 'express';
import { AnswerController } from './controllers/AnswerController';
import { NpsController } from './controllers/NpsController';
import { SendMailController } from './controllers/SendMailController';
import { SurveyController } from './controllers/SurveyController';
import { UserController } from './controllers/UserController';

const router = Router();

router.post('/users', UserController.create);

router.post('/surveys', SurveyController.create);
router.get('/surveys', SurveyController.findAll);

router.post('/sendMail', SendMailController.execute);

router.get('/answers/:value', AnswerController.execute);

router.get('/nps/:surveyId', NpsController.execute);

export { router };

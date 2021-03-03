import { Request, Response } from 'express';
import { getCustomRepository } from 'typeorm';
import * as yup from 'yup';
import { AppError } from '../errors/AppError';
import { SurveyRepository } from '../repositories/SurveyRepository';

class SurveyController {
  static async create(request: Request, response: Response) {
    const { title, description } = request.body;

    const schema = yup.object().shape({
      title: yup.string().required(),
      description: yup.string().required(),
    });

    try {
      await schema.validate(request.body, { abortEarly: false });
    } catch (err) {
      throw new AppError(err);
    }

    const surveyRepository = getCustomRepository(SurveyRepository);

    const survey = surveyRepository.create({
      title,
      description,
    });

    await surveyRepository.save(survey);

    return response.status(201).json(survey);
  }

  static async findAll(request: Request, response: Response) {
    const surveyRepository = getCustomRepository(SurveyRepository);

    const all = await surveyRepository.find();

    return response.status(200).json(all);
  }
}

export { SurveyController };

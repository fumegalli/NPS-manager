import { Request, Response } from "express";
import { getCustomRepository } from "typeorm";
import { AppError } from "../errors/AppError";
import { SurveyUserRepository } from "../repositories/SurveyUserRepository";

class AnswerController {
  async execute(request: Request, response: Response) {
    const { value } = request.params;
    const { user } = request.query;

    const surveyUserRepository = getCustomRepository(SurveyUserRepository);

    const surveyUser = await surveyUserRepository.findOne({
      id: String(user),
    });

    if (!surveyUser) throw new AppError('Survey User dows not exists!', 404);

    surveyUser.value = Number(value);

    await surveyUserRepository.save(surveyUser);

    return response.status(200).json(surveyUser);
  }
}

export { AnswerController };
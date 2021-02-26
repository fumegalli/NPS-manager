import { Request, Response } from "express";
import { getCustomRepository, Not, IsNull } from "typeorm";
import { SurveyUserRepository } from "../repositories/SurveyUserRepository";

class NpsController {
  async execute(request: Request, response: Response) {
    const { survey_id } = request.params;

    const surveyUserRepository = getCustomRepository(SurveyUserRepository);

    const answers = await surveyUserRepository.find({
      survey_id,
      value: Not(IsNull()),
    });

    let detractors = 0;
    let passives = 0;
    let promoters = 0;

    answers.forEach((answer) => {
      if (answer.value < 7) {
        detractors++;
      } else if (answer.value < 9) {
        passives++;
      } else {
        promoters++;
      }
    });

    const totalAnswers = answers.length;
    const nps = Number((((promoters - detractors) / totalAnswers) * 100).toFixed(2));

    return response.status(200).json({
      detractors,
      promoters,
      passives,
      totalAnswers,
      nps,
    });
  }
}

export { NpsController };
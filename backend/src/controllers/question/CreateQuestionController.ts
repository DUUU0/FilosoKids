import { Request, Response } from "express";
import { CreateQuestionService } from "../../services/question/CreateQuestionService";

class CreateQuestionController {
    async handle(req: Request, res: Response) {

        const { text_if_correct, text_if_incorrect, number, avatar, image_upper_right, image_bottom_right, image_bottom_left, phase_id } = req.body

        const createQuestionService = new CreateQuestionService()

        const question = await createQuestionService.execute({
            text_if_correct,
            text_if_incorrect,
            number,
            avatar,
            image_upper_right,
            image_bottom_right,
            image_bottom_left,
            phase_id
        })

        return res.json(question)
    }
}

export { CreateQuestionController }
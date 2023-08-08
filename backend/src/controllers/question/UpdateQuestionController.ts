import { Request, Response } from "express";
import { UpdateQuestionService } from "../../services/question/UpdateQuestionService";

class UpdateQuestionController {
    async handle(req: Request, res: Response) {

        const { question_id, text_if_correct, text_if_incorrect, number, avatar, image_upper_right, image_bottom_right, image_bottom_left, phase_id } = req.body

        const updateQuestionService = new UpdateQuestionService()

        const question = await updateQuestionService.execute({
            question_id,
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

export { UpdateQuestionController }
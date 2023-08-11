import { Request, Response } from "express";
import { CreateQuestionService } from "../../services/question/CreateQuestionService";

class CreateQuestionController {
    async handle(req: Request, res: Response) {

        const { text, text_if_correct, text_if_incorrect, number, phase_id, list_alternatives } = req.body

        const createQuestionService = new CreateQuestionService()

        const { filename: avatar } = req.files["avatar"][0]
        const { filename: image_upper_right } = req.files["image_upper_right"][0]
        const { filename: image_bottom_right } = req.files["image_bottom_right"][0]
        const { filename: image_bottom_left } = req.files["image_bottom_left"][0]

        const question = await createQuestionService.execute({
            text,
            text_if_correct,
            text_if_incorrect,
            number: 99,
            avatar,
            image_upper_right,
            image_bottom_right,
            image_bottom_left,
            phase_id,
            list_alternatives
        })

        return res.json(question)

    }
}

export { CreateQuestionController }

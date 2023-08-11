import { Request, Response } from "express";
import { SendQuestionService } from "../../services/question/SendQuestionService";

class SendQuestionController {
    async handle(req: Request, res: Response) {

        const { user_id, question_id } = req.body

        const sendQuestionService = new SendQuestionService()

        const question = await sendQuestionService.execute({
            user_id,
            question_id
        })

        return res.json(question)

    }
}

export { SendQuestionController }
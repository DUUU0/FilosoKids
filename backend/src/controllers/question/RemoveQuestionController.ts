import { RemoveQuestionService } from "../../services/question/RemoveQuestionService";
import { Request, Response } from "express";

class RemoveQuestionController {
    async handle(req: Request, res: Response) {

        const question_id = req.params.id

        const removeQuestionService = new RemoveQuestionService()

        const question = await removeQuestionService.execute({ question_id })

        return res.json(question)

    }
}

export { RemoveQuestionController }
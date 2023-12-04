import { Request, Response } from "express";
import { ListAllQuestionService } from "../../services/question/ListAllQuestionsService";

class ListAllQuestionController {
    async handle(req: Request, res: Response) {

        const { user_id } = req.body

        const listAllQuestionService = new ListAllQuestionService()

        const question = await listAllQuestionService.execute({ user_id })

        return res.json(question)
    }
}

export { ListAllQuestionController }

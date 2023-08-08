import { Request, Response } from "express";
import { ListQuestionService } from "../../services/question/ListQuestionService";

class ListQuestionController {
    async handle(req: Request, res: Response) {

        const { question_id } = req.body

        const listQuestionService = new ListQuestionService()

        const question = await listQuestionService.execute({ question_id })

        return res.json(question)
    }
}

export { ListQuestionController }
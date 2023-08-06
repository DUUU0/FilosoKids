import { Request, Response } from "express";
import { ListByQuestionService } from "../../services/alternativie/ListByQuestionService";

class ListByQuestionController {
    async handle(req: Request, res: Response) {

        const { question_id } = req.body

        const listByQuestionService = new ListByQuestionService()

        const alternative = await listByQuestionService.execute({ question_id })

        return res.json(alternative)
    }
}

export { ListByQuestionController }
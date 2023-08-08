import { Request, Response } from "express";
import { ListAllQuestionService } from "../../controllers/question/ListAllQuestionService";

class ListAllQuestionController {
    async handle(req: Request, res: Response) {

        const listAllQuestionService = new ListAllQuestionService()

        const question = await listAllQuestionService.execute()

        return res.json(question)
    }
}

export { ListAllQuestionController }
import { ListQuestionsService } from "../../services/question/ListQuestionsService"
import { Request, Response } from "express"

class ListQuestionsController {
    async handle(req: Request, res: Response) {

        const listQuestionService = new ListQuestionsService()

        const questions = await listQuestionService.execute()

        return res.json(questions)
    }
}

export { ListQuestionsController }
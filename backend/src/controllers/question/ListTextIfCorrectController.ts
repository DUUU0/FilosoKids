import { Request, Response } from "express";
import { ListTextIfCorrectService } from "../../services/question/ListTextIfCorrectService";

class ListTextIfCorrectController {
    async handle(req: Request, res: Response) {

        const question_id = req.params.id

        const listTextIfCorrectService = new ListTextIfCorrectService()

        const question = await listTextIfCorrectService.execute({ question_id })

        return res.json(question)

    }
}

export { ListTextIfCorrectController }
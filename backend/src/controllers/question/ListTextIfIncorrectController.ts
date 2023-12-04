import { Request, Response } from "express";
import { ListTextIfIncorrectService } from "../../services/question/ListTextIfIncorrectService";

class ListTextIfIncorrectController {
    async handle(req: Request, res: Response) {

        const question_id = req.params.id

        const listTextIfIncorrectService = new ListTextIfIncorrectService()

        const question = await listTextIfIncorrectService.execute({ question_id })

        return res.json(question)

    }
}

export { ListTextIfIncorrectController }
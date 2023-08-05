import { CreatealternativieService } from "../../services/alternativie/CreateAlternativieService";
import { Request, Response } from "express";

class CreateAlternativieController {
    async handle(req: Request, res: Response) {

        const { letter, text, true_or_false, question_id } = req.body

        const createAlternativieService = new CreatealternativieService()

        const alternative = await createAlternativieService.execute({
            letter,
            text,
            true_or_false,
            question_id
        })

        return res.json(alternative)

    }
}

export { CreateAlternativieController }

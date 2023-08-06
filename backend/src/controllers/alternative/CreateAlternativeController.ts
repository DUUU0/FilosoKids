import { CreatealternativeService } from "../../services/alternativie/CreateAlternativeService";
import { Request, Response } from "express";

class CreateAlternativeController {
    async handle(req: Request, res: Response) {

        const { letter, text, true_or_false, question_id } = req.body

        const createAlternativeService = new CreatealternativeService()

        const alternative = await createAlternativeService.execute({
            letter,
            text,
            true_or_false,
            question_id
        })

        return res.json(alternative)

    }
}

export { CreateAlternativeController }

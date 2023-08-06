import { Request, Response } from "express";
import { UpdateAlternativeService } from "../../services/alternativie/UpdateAlternativeService";

class UpdateAlternativeController {
    async handle(req: Request, res: Response) {

        const { alternative_id, text, true_or_false } = req.body

        const updateAlternativeService = new UpdateAlternativeService()

        const alternative = await updateAlternativeService.execute({
            alternative_id,
            text,
            true_or_false
        })

        return res.json(alternative)

    }
}

export { UpdateAlternativeController }
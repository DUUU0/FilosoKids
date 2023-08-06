import { Request, Response } from "express";
import { RemoveAlternativeService } from "../../services/alternativie/RemoveAlternativeService";

class RemoveAlternativeController {
    async handle(req: Request, res: Response) {

        const { alternative_id } = req.body

        const removeAlternativeService = new RemoveAlternativeService()

        const alternative = await removeAlternativeService.execute({ alternative_id })

        return res.json(alternative)
    }
}

export { RemoveAlternativeController }
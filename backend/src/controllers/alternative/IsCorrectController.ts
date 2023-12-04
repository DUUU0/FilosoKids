import { Request, Response } from "express";
import { IsCorrectSercice } from "../../services/alternativie/IsCorrectService";

class IsCorrectController {
    async handle(req: Request, res: Response) {
        const { number } = req.body

        const isCorrectSercice = new IsCorrectSercice()

        const alternative = await isCorrectSercice.execute({ number })

        return res.json(alternative)
    }
}

export { IsCorrectController }
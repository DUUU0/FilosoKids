import { CreatePhaseService } from "../../services/phase/CreatePhaseService";
import { Request, Response } from "express";

class CreatePhaseController {
    async handle(req: Request, res: Response) {

        const { name, number } = req.body

        const createPhaseService = new CreatePhaseService()

        const phase = await createPhaseService.execute({
            name,
            number
        })

        return res.json(phase)
    }
}

export { CreatePhaseController }
import { RemovePhaseService } from "../../services/phase/RemovePhaseService";
import { Request, Response } from "express";

class RemovePhaseController{
    async handle(req: Request, res: Response){

        const { phase_id } = req.body

        const removePhaseService = new RemovePhaseService()

        const phase = await removePhaseService.execute({phase_id})

        return res.json(phase)

    }
}

export { RemovePhaseController }
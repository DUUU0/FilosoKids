import { Request, Response } from "express";
import { UptadePhaseService } from "../../services/phase/UptadePhaseService";

class UpdatePhaseController{
    async handle(req: Request, res: Response){

        const { phase_id, name, number } = req.body

        const updatePhaseService = new UptadePhaseService()

        const phase = await updatePhaseService.execute({
            phase_id,
            name,
            number
        })

        return res.json(phase)

    }
}

export { UpdatePhaseController }
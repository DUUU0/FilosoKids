import { Request, Response } from "express";
import { PhaseListIdService } from "../../services/phase/PhaseListIdService";

class PhaseListIdController {
    async handle(req: Request, res: Response) {

        const phase_id = req.params.id

        const phaselistIdService = new PhaseListIdService()

        const phase = await phaselistIdService.execute({ phase_id })

        return res.json(phase)
    }
}

export { PhaseListIdController }
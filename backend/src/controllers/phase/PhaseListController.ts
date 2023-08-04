import { Request, Response } from "express";
import { PhaseListService } from "../../services/phase/PhaseListService";

class PhaseListController{
    async handle(req: Request, res: Response){

        const phaseListService = new PhaseListService()

        const phase = await phaseListService.execute()

        return res.json(phase)
    }
}

export { PhaseListController }
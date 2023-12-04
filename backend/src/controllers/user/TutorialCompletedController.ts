import { TutorialCompletedService } from "../../services/user/TutorialCompletedService";
import { Request, Response } from "express";

class TutorialCompletedController {
    async handle(req: Request, res: Response) {

        const user_id = req.body

        const tutorialCompletedService = new TutorialCompletedService()

        const user = await tutorialCompletedService.execute(user_id)

        return res.json(user)
    }
}

export { TutorialCompletedController }
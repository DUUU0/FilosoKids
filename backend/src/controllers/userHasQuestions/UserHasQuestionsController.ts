import { Request, Response } from "express";
import { UserHasQuestionsService } from "../../services/userHasQuestions/UserHasQuestionsService";

class UserHasQuestionsController {
    async handle(req: Request, res: Response) {

        const user_id = req.params.user_id

        const userHasQuestionsService = new UserHasQuestionsService()

        const userHasQuestions = await userHasQuestionsService.execute({
            user_id
        })

        return res.json(userHasQuestions)
    }
}

export { UserHasQuestionsController }
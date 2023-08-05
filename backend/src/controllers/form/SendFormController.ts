import { Request, Response } from "express";
import { SendFormService } from "../../services/form/SendFormService";

class SendFormController {
    async handle(req: Request, res: Response) {

        const { text, user_id } = req.body

        const sendFormService = new SendFormService()

        const form = await sendFormService.execute({
            text,
            user_id
        })

        return res.json(form)

    }
}

export { SendFormController }
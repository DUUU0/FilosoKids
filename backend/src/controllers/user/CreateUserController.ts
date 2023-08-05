import { Request, Response } from "express";
import { CreateUserService } from "../../services/user/CreateUserService";

class CreateUserController {
    async handle(req: Request, res: Response) {
        const { name, nickname, password, isAdmin } = req.body

        const createUserService = new CreateUserService()

        const user = await createUserService.execute({
            name,
            nickname,
            password,
            isAdmin
        })

        return res.json(user)

    }

}

export { CreateUserController }
import prismaClient from "../../prisma";
import { hash } from "bcryptjs";

interface UserRequest {
    name: string
    password: string
    nickname: string
    isAdmin: boolean
    tutorial_concluded: boolean
}

class CreateUserService {
    async execute({ name, password, nickname }: UserRequest) {

        const userAlreadyExists = await prismaClient.user.findFirst({
            where: {
                nickname: nickname
            }
        })

        if (userAlreadyExists) {
            throw new Error("Usuário já existe!")
        }

        const passwordHash = await hash(password, 8)

        const user = await prismaClient.user.create({
            data: {
                name: name,
                nickname: nickname,
                password: passwordHash,
                is_admin: false,
                tutorial_completed: false
            },
            select: {
                id: true,
                name: true,
                nickname: true,
                is_admin: true,
                tutorial_completed: true
            }
        })

        return { user }

    }

}

export { CreateUserService }
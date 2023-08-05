import prismaClient from "../../prisma";
import { hash } from "bcryptjs";

interface UserRequest {
    name: string
    password: string
    nickname: string
    isAdmin: boolean
}

class CreateUserService {
    async execute({ name, password, nickname, isAdmin }: UserRequest) {

        if (!nickname) {
            throw new Error("Apelido incorreto!")
        }

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
                is_admin: false
            },
            select: {
                id: true,
                name: true,
                nickname: true,
                is_admin: true
            }
        })

        return { user }

    }

}

export { CreateUserService }
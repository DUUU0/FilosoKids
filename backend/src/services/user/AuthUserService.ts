import prismaClient from "../../prisma"
import { compare } from "bcryptjs"
import { sign } from "jsonwebtoken"

interface AuthRequest{
    nickname: string
    password: string
}

class AuthUserService{
    async execute({nickname, password}: AuthRequest){

        const user = await prismaClient.user.findFirst({
            where:{
                nickname: nickname
            }
        })

        if (!user) {
            throw new Error("Usuário ou senha incorreto!")
        }

        const passwordMatch = await compare(password, user.password)

        if (!passwordMatch) {
            throw new Error("Usuário ou senha incorreto!")
        }

        const token = sign(
            {
                name: user.name,
                nickname: user.nickname
            },
            process.env.JWT_SECRET,
            {
                subject: user.id
            }
        )

        return{
            id: user.id,
            nickname: user.nickname,
            isAdmin: user.is_admin,
            token: token
        }
    }
}

export { AuthUserService }
import prismaClient from "../../prisma";

class DetailUserService {
    async execute(user_id: string) {

        const detailUser = prismaClient.user.findFirst({
            where: {
                id: user_id
            },
            select: {
                id: true,
                name: true,
                nickname: true,
                is_admin: true,
                tutorial_completed: true
            }
        })

        return detailUser
    }
}

export { DetailUserService }
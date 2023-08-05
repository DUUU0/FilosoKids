import prismaClient from "../../prisma";

class DetailAdminService {
    async execute(user_id: string) {

        const user = await prismaClient.user.findFirst({
            where: {
                id: user_id
            },
            select: {
                id: true,
                name: true,
                nickname: true,
                is_admin: true
            }
        })

        return user

    }
}

export { DetailAdminService }
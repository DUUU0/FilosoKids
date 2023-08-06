import prismaClient from "../../prisma";

interface AlternativeRequest {
    alternative_id: string
}

class RemoveAlternativeService {
    async execute({ alternative_id }: AlternativeRequest) {

        const alternative = await prismaClient.alternative.delete({
            where: {
                id: alternative_id
            }
        })

        return alternative

    }
}

export { RemoveAlternativeService }
import prismaClient from "../../prisma";

interface AlternativeRequest {
    alternative_id: string
    text: string
    true_or_false: boolean
}

class UpdateAlternativeService {
    async execute({ alternative_id, text, true_or_false }: AlternativeRequest) {

        const alternative = await prismaClient.alternative.update({
            where: {
                id: alternative_id
            },
            data: {
                text,
                true_or_false
            }
        })

        return alternative

    }
}

export { UpdateAlternativeService }
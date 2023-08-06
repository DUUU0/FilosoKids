import prismaClient from "../../prisma";

interface AlternativeRequest {
    question_id: string
}

class ListByQuestionService {
    async execute({ question_id }: AlternativeRequest) {

        const alternative = prismaClient.alternative.findMany({
            where: {
                question_id
            },
            select: {
                id: true,
                letter: true,
                text: true,
                true_or_false: true
            }
        })

        return alternative

    }
}

export { ListByQuestionService }
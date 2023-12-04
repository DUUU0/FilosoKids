import prismaClient from "../../prisma";

interface QuestionRequest {
    number: number
}

class IsCorrectSercice {
    async execute({ number }: QuestionRequest) {

        /*const alternative = await prismaClient.alternative.findFirst({
            where: {
                id: alternative_id
            },
            select: {
                true_or_false: true
            }
        })*/

        const alternative = await prismaClient.question.findUnique({
            where: {
                number: number
            },
            select: {
                alternatives: {
                    where: {
                        true_or_false: true
                    }
                }
            }

        })

        return alternative
    }
}

export { IsCorrectSercice }
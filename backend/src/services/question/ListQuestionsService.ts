import prismaClient from "../../prisma"

class ListQuestionsService {
    async execute() {

        const questions = await prismaClient.question.findMany({
            select: {
                id: true,
                number: true,
                text: true,
                already_answered: true,
                alternatives: {
                    select: {
                        id: true,
                        letter: true,
                        text: true,
                        true_or_false: true
                    }
                },
                phase: {
                    select: {
                        name: true,
                        number: true
                    }

                }
            },
            orderBy: {
                number: "asc"
            }
        })

        return questions
    }
}

export { ListQuestionsService }
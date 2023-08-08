import prismaClient from "../../prisma";

class ListAllQuestionService {
    async execute() {

        const questions = await prismaClient.question.findMany({
            select: {
                id: true,
                number: true,
                text: true,
                phase: {
                    select: {
                        name: true,
                        number: true
                    }

                }
            }
        })

        return questions

    }
}

export { ListAllQuestionService }
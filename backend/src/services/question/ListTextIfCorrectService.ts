import prismaClient from "../../prisma";

interface QuestionRequest {
    question_id: string
}

class ListTextIfCorrectService {
    async execute({ question_id }: QuestionRequest) {

        const question = await prismaClient.question.findUnique({
            where: {
                id: question_id
            },
            select: {
                text_if_correct: true
            }
        })

        return question

    }
}

export { ListTextIfCorrectService }
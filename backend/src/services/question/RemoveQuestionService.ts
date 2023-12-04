import prismaClient from "../../prisma";

interface QuestionRequest {
    question_id: string
}

class RemoveQuestionService {
    async execute({ question_id }: QuestionRequest) {

        const questionsHasUsers = await prismaClient.user_has_Questions.deleteMany({
            where: {
                question_id: question_id
            }
        })


        const question = await prismaClient.question.delete({
            where: {
                id: question_id,
            }
        })

        return questionsHasUsers && question

    }
}

export { RemoveQuestionService }
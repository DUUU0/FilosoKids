import prismaClient from "../../prisma";

interface QuestionRequest {
    question_id: string
    user_id: string
}

class SendQuestionService {
    async execute({ question_id, user_id }: QuestionRequest) {

        const question = await prismaClient.user_has_Questions.create({
            data: {
                question_id,
                user_id
            }  

        })

        return { question }

    }
}

export { SendQuestionService }
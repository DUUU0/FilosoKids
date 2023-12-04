import prismaClient from "../../prisma";

interface QuestionRequest {
    question_id: string
}


class ListTextIfIncorrectService {
    async execute({ question_id }: QuestionRequest) {

        const question = await prismaClient.question.findUnique({
            where: {
                id: question_id
            },
            select: {
                text_if_incorrect: true,
                id: true,
                phase: {
                    select: {
                        number: true
                    }
                },
                number: true
            }
        })

        return question

    }
}

export { ListTextIfIncorrectService }
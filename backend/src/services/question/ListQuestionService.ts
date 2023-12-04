import prismaClient from "../../prisma";

interface QuestionRequest {
    question_id: string
}

class ListQuestionService {
    async execute({ question_id }: QuestionRequest) {

        const question = await prismaClient.question.findUnique({
            where: {
                id: question_id
            },
            select: {
                id: true,
                number: true,
                text: true,
                text_if_correct: true,
                text_if_incorrect: true,
                avatar: true,
                image_bottom_left: true,
                image_bottom_right: true,
                image_upper_right: true,
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
                        id: true,
                        name: true,
                        number: true
                    }
                }
            }
        })

        return question

    }
}

export { ListQuestionService }
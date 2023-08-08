import prismaClient from "../../prisma";

interface QuestionRequest {
    question_id: string
    text_if_correct: string
    text_if_incorrect: string
    number: number
    avatar: string
    image_upper_right: string
    image_bottom_right: string
    image_bottom_left: string
    phase_id: string
}

class UpdateQuestionService {
    async execute({ question_id, text_if_correct, text_if_incorrect, number, avatar, image_upper_right, image_bottom_right, image_bottom_left, phase_id }: QuestionRequest) {

        const questionAlreadyExists = await prismaClient.question.findFirst({
            where: {
                number: number
            }
        })

        if (questionAlreadyExists) {
            throw new Error("Questão ja existe!");
        }

        const question = await prismaClient.question.update({
            where: {
                id: question_id
            },
            data: {
                text_if_correct: text_if_correct,
                text_if_incorrect: text_if_incorrect,
                number: number,
                avatar: avatar,
                image_upper_right: image_upper_right,
                image_bottom_right: image_bottom_right,
                image_bottom_left: image_bottom_left,
                phase_id
            }

        })

        return question

    }
}

export { UpdateQuestionService }
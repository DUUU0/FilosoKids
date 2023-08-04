import prismaClient from "../../prisma";

interface QuestionRequest {
    text_if_correct: string
    text_if_incorrect: string
    number: string
    avatar: string
    image_upper_right: string
    image_bottom_right: string
    image_bottom_left: string
    phase_id: string
}

class CreateQuestionService {
    async execute({ text_if_correct, text_if_incorrect, number, avatar, image_upper_right, image_bottom_right, image_bottom_left, phase_id }: QuestionRequest) {

        const questionAlreadyExists = await prismaClient.question.findFirst({
            where: {
                number: number
            }
        })

        if (questionAlreadyExists) {
            throw new Error("Questão ja existe!");
        }

        const question = await prismaClient.question.create({
            data: {
                text_if_correct,
                text_if_incorrect,
                number,
                avatar,
                image_upper_right,
                image_bottom_right,
                image_bottom_left,
                phase_id,
            },
            select: {
                id: true,
                text_if_correct: true,
                text_if_incorrect: true,
                number: true,
                avatar: true,
                image_upper_right: true,
                image_bottom_right: true,
                image_bottom_left: true,
                phase_id: true
            }
        })

        return { question }

    }
}

export { CreateQuestionService }
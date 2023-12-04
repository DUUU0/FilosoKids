import prismaClient from "../../prisma";

interface QuestionRequest {
    text: string
    text_if_correct: string
    text_if_incorrect: string
    number: number
    phase_id: string
    avatar: string | null
    image_upper_right: string | null
    image_bottom_right: string | null
    image_bottom_left: string | null
    list_alternatives: []
}

class CreateQuestionService {
    async execute({ text, text_if_correct, text_if_incorrect, number, phase_id, list_alternatives, image_upper_right, avatar, image_bottom_right, image_bottom_left, }: QuestionRequest) {

        const questionAlreadyExists = await prismaClient.question.findFirst({
            where: {
                number
            }
        })

        if (questionAlreadyExists) {
            throw new Error("Questão ja existe!");
        }

        const question = await prismaClient.question.create({
            data: {
                text,
                text_if_correct,
                text_if_incorrect,
                number,
                avatar,
                image_upper_right,
                image_bottom_right,
                image_bottom_left,
                already_answered: false,
                phase_id,
                alternatives: {
                    createMany: {
                        data: list_alternatives
                    }
                }
            },
            include: {
                alternatives: true
            }
        })

        return { question }

    }
}

export { CreateQuestionService }


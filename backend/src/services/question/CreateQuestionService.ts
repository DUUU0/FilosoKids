import prismaClient from "../../prisma";

interface QuestionRequest {
    text: string
    text_if_correct: string
    text_if_incorrect: string
    number: number
    avatar: string
    image_upper_right: string
    image_bottom_right: string
    image_bottom_left: string
    phase_id: string
    list_alternatives: []
}

class CreateQuestionService {
    async execute({ text, text_if_correct, text_if_incorrect, number, avatar, image_upper_right, image_bottom_right, image_bottom_left, phase_id, list_alternatives }: QuestionRequest) {

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


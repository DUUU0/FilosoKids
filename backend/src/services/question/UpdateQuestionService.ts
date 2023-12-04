import prismaClient from "../../prisma";

interface Alternative {

    id: string;
    letter: string;
    text: string;
    true_or_false: boolean;
}

interface QuestionRequest {
    question_id: string
    text: string
    text_if_correct: string
    text_if_incorrect: string
    number: number
    avatar: string
    image_upper_right: string
    image_bottom_right: string
    image_bottom_left: string
    phase_id: string
    list_alternatives: Alternative[]
}

class UpdateQuestionService {
    async execute({ question_id, text, text_if_correct, text_if_incorrect, number, avatar, image_upper_right, image_bottom_right, image_bottom_left, phase_id, list_alternatives }: QuestionRequest) {

        const question = await prismaClient.question.update({
            where: {
                id: question_id
            },
            data: {
                text: text,
                text_if_correct: text_if_correct,
                text_if_incorrect: text_if_incorrect,
                number: number,
                avatar: avatar,
                image_upper_right: image_upper_right,
                image_bottom_right: image_bottom_right,
                image_bottom_left: image_bottom_left,
                phase_id,
                alternatives: {
                    updateMany: list_alternatives.map((alternative) => ({
                        where: { id: alternative.id }, // Assuming you have an id field in the Alternative interface
                        data: {
                            letter: alternative.letter,
                            text: alternative.text,
                            true_or_false: alternative.true_or_false
                            // Add other fields you want to update
                        }
                    }))
                }
            }

        })

        return question

    }
}

export { UpdateQuestionService }
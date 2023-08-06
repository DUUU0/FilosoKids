import prismaClient from "../../prisma";

interface AlternativeRequest {
    letter: string
    text: string
    true_or_false: boolean
    question_id: string
}

class CreatealternativeService {
    async execute({ letter, text, true_or_false, question_id }: AlternativeRequest) {

        const alternative = await prismaClient.alternative.create({
            data: {
                letter,
                text,
                true_or_false,
                question_id
            },
            select: {
                id: true,
                letter: true,
                text: true,
                true_or_false: true,
                question_id: true
            }
        })

        return { alternative }

    }
}

export { CreatealternativeService }

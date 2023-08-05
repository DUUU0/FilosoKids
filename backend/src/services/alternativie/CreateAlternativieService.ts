import prismaClient from "../../prisma";

interface AlternativieRequest {
    letter: string
    text: string
    true_or_false: boolean
    question_id: string
}

class CreatealternativieService {
    async execute({ letter, text, true_or_false, question_id }: AlternativieRequest) {

        const alternativie = await prismaClient.alternative.create({
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

        return { alternativie }

    }
}

export { CreatealternativieService }

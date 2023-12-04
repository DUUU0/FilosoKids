import prismaClient from "../../prisma";

interface UserProps {
    user_id: string
}

class ListAllQuestionService {
    async execute({ user_id }: UserProps) {

        const questions = await prismaClient.question.findMany({
            
            select: {
                id: true,
                number: true,
                text: true,
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
                        name: true,
                        number: true
                    }

                }
            },
            orderBy: {
                number: "asc"
            }
        })

        return questions

    }
}

export { ListAllQuestionService }
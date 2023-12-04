import prismaClient from "../../prisma";

interface UserHasQuestionsProps {
    user_id: string
}

class UserHasQuestionsService {
    async execute({ user_id }: UserHasQuestionsProps) {


        const userQuestions = await prismaClient.user_has_Questions.findMany({
            where: {
                user_id: user_id,
            },
            select: {
                question_id: true,
            },
        });

        const unansweredQuestions = await prismaClient.question.findFirst({
            where: {
                NOT: {
                    id: {
                        in: userQuestions.map((userQuestion) => userQuestion.question_id),
                    },
                },
            },
            orderBy: {
                number: "asc"
            },
            select: {
                id: true,
                number: true,
                avatar: true,
                image_bottom_left: true,
                image_bottom_right: true,
                image_upper_right: true,
                text: true,
                phase: true,
                alternatives: true
            }
        });

        return unansweredQuestions

    }
}
export { UserHasQuestionsService }
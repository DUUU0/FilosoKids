import prismaClient from "../../prisma";

interface RequestTutorial {
    user_id: string
}

class TutorialCompletedService {

    async execute({ user_id }: RequestTutorial) {

        const tutorial_completed = await prismaClient.user.update({
            where: {
                id: user_id
            },
            data: {
                tutorial_completed: true
            }
        })

        return tutorial_completed
    }
}

export { TutorialCompletedService }
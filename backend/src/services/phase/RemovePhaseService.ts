import prismaClient from "../../prisma";

interface PhaseRequest {
    phase_id: string
}

class RemovePhaseService {
    async execute({ phase_id }: PhaseRequest) {

        const questionsHasUsers = await prismaClient.user_has_Questions.deleteMany({
            where: {
                question: {
                    phase_id: phase_id
                }
            }
        })

        const phase = await prismaClient.phase.delete({
            where: {
                id: phase_id
            }

        })

        return questionsHasUsers && phase

    }
}

export { RemovePhaseService }
import prismaClient from "../../prisma"

interface PhaseProps {
    phase_id: string
}

class PhaseListIdService {
    async execute({ phase_id }: PhaseProps) {

        const phase = await prismaClient.phase.findUnique({
            where: {
                id: phase_id
            },
            select: {
                name: true,
                number: true
            }
        })

        return phase
    }

}

export { PhaseListIdService }
import prismaClient from "../../prisma";

interface PhaseRequest {
    phase_id: string
    name: string
    number: number
}

class UptadePhaseService {
    async execute({ phase_id, name, number }: PhaseRequest) {

        if (!number) {
            throw new Error("Número incorreto!");
        }

        const phaseAlreadyExists = await prismaClient.phase.findFirst({
            where: {
                number: number
            }
        })

        if (phaseAlreadyExists) {
            throw new Error("Fase ja existe!");
        }

        const phase = await prismaClient.phase.update({
            where: {
                id: phase_id
            },
            data: {
                name: name,
                number: number
            }
        })

        return phase

    }
}

export { UptadePhaseService }
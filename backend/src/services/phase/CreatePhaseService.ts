import prismaClient from "../../prisma";

interface PhaseRequest {
    number: number
    name: string
}

class CreatePhaseService {
    async execute({ number, name }: PhaseRequest) {

        const phaseAlreadyExists = await prismaClient.phase.findFirst({
            where: {
                number: number
            }
        })

        if (phaseAlreadyExists) {
            throw new Error("Fase ja existe!");
        }

        const phase = await prismaClient.phase.create({
            data: {
                number: number,
                name: name
            },
            select: {
                id: true,
                name: true,
                number: true
            }
        })

        return { phase }
    }
}

export { CreatePhaseService }
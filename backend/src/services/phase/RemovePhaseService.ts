import prismaClient from "../../prisma";

interface PhaseRequest{
    phase_id: string
}

class RemovePhaseService{
    async execute({ phase_id }: PhaseRequest){

        const phase = await prismaClient.phase.delete({
            where:{
                id: phase_id
            }
        })

        return phase

    }
}

export { RemovePhaseService }
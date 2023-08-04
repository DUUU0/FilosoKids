import prismaClient from "../../prisma";

class PhaseListService{
    async execute(){
        
        const phase = await prismaClient.phase.findMany({
            select:{
                id: true,
                name: true,
                number: true
            }
        })

        return phase

    }
}

export { PhaseListService }
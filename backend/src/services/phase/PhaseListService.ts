import prismaClient from "../../prisma";

class PhaseListService {
    async execute() {

        const phase = await prismaClient.phase.findMany({
            select: {
                id: true,
                name: true,
                number: true
            },
            orderBy: {
                number: "asc"
            }
        })

        return phase

    }
}

export { PhaseListService }
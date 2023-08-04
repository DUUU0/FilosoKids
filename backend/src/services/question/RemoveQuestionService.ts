import prismaClient from "../../prisma";

interface QuestionRequest{
    question_id: string
}

class RemoveQuestionService{
    async execute({question_id}: QuestionRequest){

        const question = await prismaClient.question.delete({
            where:{
                id: question_id
            }
        })

        return question
        
    }
}

export { RemoveQuestionService }
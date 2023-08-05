import prismaClient from "../../prisma";

interface FormRequest {
    text: string
    user_id: string
}

class SendFormService {
    async execute({ text, user_id }: FormRequest) {

        const form = await prismaClient.form.create({
            data: {
                text: text,
                user_id: user_id
            },
            select: {
                id: true,
                text: true,
                user_id: true
            }
        })

        return { form }

    }
}

export { SendFormService }
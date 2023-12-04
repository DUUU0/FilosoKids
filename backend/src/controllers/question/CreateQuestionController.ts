import { Request, Response } from "express";
import { CreateQuestionService } from "../../services/question/CreateQuestionService";

class CreateQuestionController {
    async handle(req: Request, res: Response) {

        const { text, text_if_correct, text_if_incorrect, number, phase_id, list_alternatives } = req.body

        const createQuestionService = new CreateQuestionService()

        const avatarFile = req.files["avatar"] ? req.files["avatar"][0] : null;
        const imageUpperRightFile = req.files["image_upper_right"] ? req.files["image_upper_right"][0] : null;
        const imageBottomRightFile = req.files["image_bottom_right"] ? req.files["image_bottom_right"][0] : null;
        const imageBottomLeftFile = req.files["image_bottom_left"] ? req.files["image_bottom_left"][0] : null;

        const avatar = avatarFile ? avatarFile.filename : null;
        const imageUpperRight = imageUpperRightFile ? imageUpperRightFile.filename : null;
        const imageBottomRight = imageBottomRightFile ? imageBottomRightFile.filename : null;
        const imageBottomLeft = imageBottomLeftFile ? imageBottomLeftFile.filename : null;

        for (let a of list_alternatives)
            a.true_or_false = a.true_or_false == "true"

        const question = await createQuestionService.execute({
            text,
            text_if_correct,
            text_if_incorrect,
            number: Number(number),
            phase_id,
            list_alternatives,
            avatar,
            image_upper_right: imageUpperRight,
            image_bottom_right: imageBottomRight,
            image_bottom_left: imageBottomLeft
        })

        return res.json(question)

    }
}

export { CreateQuestionController }

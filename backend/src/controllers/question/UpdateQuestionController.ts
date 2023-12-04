import { Request, Response } from "express";
import { UpdateQuestionService } from "../../services/question/UpdateQuestionService";

class UpdateQuestionController {
    async handle(req: Request, res: Response) {

        const question_id = req.params.id

        const { text_if_correct, text_if_incorrect, number, phase_id, text, list_alternatives } = req.body

        const updateQuestionService = new UpdateQuestionService()

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

        const question = await updateQuestionService.execute({
            question_id,
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

export { UpdateQuestionController }
import { Router } from "express";

import { isAuthenticated } from "./middlewares/isAuthenticated";
import { isAdmin } from "./middlewares/isAdmin";

import uploadConfig from './config/multer'
import multer from "multer";

import { CreateUserController } from "./controllers/user/CreateUserController";
import { AuthUserController } from "./controllers/user/AuthUserController";
import { DetailUserController } from "./controllers/user/DetailUserController";
import { DetailAdminController } from "./controllers/user/DetailAdminController";
import { CreatePhaseController } from "./controllers/phase/CreatePhaseController";
import { UpdatePhaseController } from "./controllers/phase/UpdatePhaseController";
import { RemovePhaseController } from "./controllers/phase/RemovePhaseController";
import { PhaseListController } from "./controllers/phase/PhaseListController";
import { SendFormController } from "./controllers/form/SendFormController";
import { CreateQuestionController } from "./controllers/question/CreateQuestionController";
import { UpdateQuestionController } from "./controllers/question/UpdateQuestionController";
import { RemoveQuestionController } from "./controllers/question/RemoveQuestionController";
import { UpdateAlternativeController } from "./controllers/alternative/UpdateAlternativeController";
import { ListAllQuestionController } from "./services/question/ListAllQuestionsService";
import { ListQuestionController } from "./controllers/question/ListQuestionController";
import { ListTextIfCorrectController } from "./controllers/question/ListTextIfCorrectController";
import { ListTextIfIncorrectController } from "./controllers/question/ListTextIfIncorrectController";
import { SendQuestionController } from "./controllers/question/SendQuestionController";

const router = Router()

const upload = multer(uploadConfig.upload("./tmp"))

// -- ROUTES USER --
router.post('/createUser', new CreateUserController().handle)
router.post('/authUser', new AuthUserController().handle)
router.get('/detailUser', isAuthenticated, new DetailUserController().handle)
router.get('/detailAdmin', isAuthenticated, isAdmin, new DetailAdminController().handle)

// -- ROUTES PHASE --
router.post('/createPhase', isAuthenticated, isAdmin, new CreatePhaseController().handle)
router.put('/updatePhase', isAuthenticated, isAdmin, new UpdatePhaseController().handle)
router.delete('/deletePhase', isAuthenticated, isAdmin, new RemovePhaseController().handle)
router.get('/phaseList', isAuthenticated, isAdmin, new PhaseListController().handle)

// -- ROUTES FORM --
router.post('/sendForm', isAuthenticated, new SendFormController().handle)

// -- ROUTES QUESTION --
const images = upload.fields([{ name: "avatar" }, { name: "image_upper_right" }, { name: "image_bottom_right" }, { name: "image_bottom_left" }])

router.post('/createQuestion', isAuthenticated, isAdmin, images, new CreateQuestionController().handle)
router.put('/updateQuestion', isAuthenticated, isAdmin, new UpdateQuestionController().handle)
router.delete('/deleteQuestion', isAuthenticated, isAdmin, new RemoveQuestionController().handle)
router.get('/listQuestions', isAuthenticated, isAdmin, new ListAllQuestionController().handle)
router.get('/listQuestion', isAuthenticated, new ListQuestionController().handle)
router.get('/listTextIfCorrect', isAuthenticated, isAdmin, new ListTextIfCorrectController().handle)
router.get('/listTextIfIncorrect', isAuthenticated, isAdmin, new ListTextIfIncorrectController().handle)
router.post('/sendQuestion', isAuthenticated, new SendQuestionController().handle)

// -- ROUTES ALTERNATIVE --
router.put('/updateAlternative', isAuthenticated, isAdmin, new UpdateAlternativeController().handle)

export { router }
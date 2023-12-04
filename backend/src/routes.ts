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
import { ListAllQuestionController } from "./controllers/question/ListAllQuestionController";
import { ListQuestionController } from "./controllers/question/ListQuestionController";
import { ListTextIfCorrectController } from "./controllers/question/ListTextIfCorrectController";
import { ListTextIfIncorrectController } from "./controllers/question/ListTextIfIncorrectController";
import { SendQuestionController } from "./controllers/question/SendQuestionController";
import { TutorialCompletedController } from "./controllers/user/TutorialCompletedController";
import { IsCorrectController } from "./controllers/alternative/IsCorrectController";
import { PhaseListIdController } from "./controllers/phase/PhaseListIdController";
import { ListQuestionsController } from "./controllers/question/ListQuestionsController";
import { UserHasQuestionsController } from "./controllers/userHasQuestions/UserHasQuestionsController";


const router = Router()

const upload = multer(uploadConfig.upload("./tmp"))

// -- ROUTES USER --
router.post('/createUser', new CreateUserController().handle)
router.post('/authUser', new AuthUserController().handle)
router.get('/detailUser', isAuthenticated, new DetailUserController().handle)
router.get('/detailAdmin', new DetailAdminController().handle)
router.put('/tutorial', new TutorialCompletedController().handle)

// -- ROUTES PHASE --
router.post('/createPhase', isAuthenticated, isAdmin, new CreatePhaseController().handle)
router.put('/updatePhase/:id', isAuthenticated, isAdmin, new UpdatePhaseController().handle)
router.delete('/deletePhase/:id', isAuthenticated, isAdmin, new RemovePhaseController().handle)
router.get('/phaseList', isAuthenticated, isAdmin, new PhaseListController().handle)
router.get('/phase/:id', isAuthenticated, isAdmin, new PhaseListIdController().handle)

// -- ROUTES FORM --
router.post('/sendForm', isAuthenticated, new SendFormController().handle)

// -- ROUTES QUESTION -- 
const images = upload.fields([{ name: "avatar", maxCount: 1 }, { name: "image_upper_right", maxCount: 1 }, { name: "image_bottom_right", maxCount: 1 }, { name: "image_bottom_left", maxCount: 1 }])

router.post('/createQuestion', isAuthenticated, isAdmin, images, new CreateQuestionController().handle)
router.put('/updateQuestion/:id', isAuthenticated, isAdmin, images, new UpdateQuestionController().handle)
router.delete('/deleteQuestion/:id', isAuthenticated, isAdmin, new RemoveQuestionController().handle)
router.get('/listQuestions', isAuthenticated, new ListAllQuestionController().handle)
router.get('/listQuestion/:id', isAuthenticated, new ListQuestionController().handle)
router.get('/listTextIfCorrect/:id', isAuthenticated, new ListTextIfCorrectController().handle)
router.get('/listTextIfIncorrect/:id', isAuthenticated, new ListTextIfIncorrectController().handle)
router.post('/sendQuestion/:id', isAuthenticated, new SendQuestionController().handle)
router.get("/questionsList", isAuthenticated, isAdmin, new ListQuestionsController().handle)

// -- ROUTES ALTERNATIVE --
router.put('/updateAlternative', isAuthenticated, isAdmin, new UpdateAlternativeController().handle)
router.get('/isCorrect', isAuthenticated, new IsCorrectController().handle)

// -- ROUTES UserHasQuestions --
router.get('/userHasQuestions/:user_id', isAuthenticated, new UserHasQuestionsController().handle)

export { router }
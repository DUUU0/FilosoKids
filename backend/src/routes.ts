import { Router } from "express";

import { isAuthenticated } from "./middlewares/isAuthenticated";
import { isAdmin } from "./middlewares/isAdmin";

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
import { CreateAlternativeController } from "./controllers/alternative/CreateAlternativeController";
import { UpdateAlternativeController } from "./controllers/alternative/UpdateAlternativeController";
import { RemoveAlternativeController } from "./controllers/alternative/RemoveAlternativeController";
import { ListByQuestionController } from "./controllers/alternative/ListByQuestionController";

const router = Router()

// -- ROTAS USER --
router.post('/createUser', new CreateUserController().handle)
router.post('/authUser', new AuthUserController().handle)
router.get('/detailUser', isAuthenticated, new DetailUserController().handle)
router.get('/detailAdmin', isAuthenticated, isAdmin, new DetailAdminController().handle)

// -- ROTAS PHASE --
router.post('/createPhase', isAuthenticated, isAdmin, new CreatePhaseController().handle)
router.put('/updatePhase', isAuthenticated, isAdmin, new UpdatePhaseController().handle)
router.delete('/deletePhase', isAuthenticated, isAdmin, new RemovePhaseController().handle)
router.get('/phaseList', isAuthenticated, isAdmin, new PhaseListController().handle)

// -- ROTAS FORM --
router.post('/sendForm', isAuthenticated, new SendFormController().handle)

// -- ROTAS QUESTION --
router.post('/createQuestion', isAuthenticated, isAdmin, new CreateQuestionController().handle)
router.put('/updateQuestion', isAuthenticated, isAdmin, new UpdateQuestionController().handle)
router.delete('/deleteQuestion', isAuthenticated, isAdmin, new RemoveQuestionController().handle)

// -- ROTAS ALTERNATIVIES --
router.post('/createAlternative', isAuthenticated, isAdmin, new CreateAlternativeController().handle)
router.put('/updateAlternative', isAuthenticated, isAdmin, new UpdateAlternativeController().handle)
router.delete('/deleteAlternative', isAuthenticated, isAdmin, new RemoveAlternativeController().handle)
router.get('/listByQuestion', isAuthenticated, new ListByQuestionController().handle)

export { router }
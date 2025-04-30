import routerEX from 'express';
import DietController from '../controllers/DietController.js';
// middlewares
// import verifyToken from '../helpers/check-token.js';

const router = routerEX.Router() 

router.post("/create", DietController.create);

export default router;
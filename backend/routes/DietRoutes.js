import routerEX from 'express';
import DietController from '../controllers/DietController.js';
// middlewares
// import verifyToken from '../helpers/check-token.js';

const router = routerEX.Router() 

router.get("/create-diet", DietController.create_diet);
router.post("/create-snacks", DietController.create_snacks);

export default router;
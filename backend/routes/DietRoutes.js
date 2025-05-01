import routerEX from 'express';
import DietController from '../controllers/DietController.js';
// middlewares
import verifyToken from '../helpers/check-token.js';
import { imageUpload } from '../helpers/image-upload.js';

const router = routerEX.Router() 

router.get("/create-diet", verifyToken, DietController.create_diet);
router.post("/create-snacks", verifyToken, DietController.create_snacks);
router.post("/create-food", verifyToken, DietController.create_food);
router.patch("/create-foods", verifyToken, imageUpload.single("image"), DietController.create_foods);

router.delete("/delete-diet/:id", verifyToken, DietController.delete_diet_by_id)
router.delete("/delete-food/:id", verifyToken, DietController.delete_food_by_id)

export default router;
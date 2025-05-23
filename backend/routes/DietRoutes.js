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
router.get("/get-diet", verifyToken, DietController.get_diet);
router.get("/get-snacks", verifyToken, DietController.get_snacks);
router.get("/get-food", verifyToken, DietController.get_food);
router.get("/get-foods", verifyToken, DietController.get_foods);
router.post("/edit-snacks/:id", verifyToken, DietController.edit_snack);
router.post("/edit-food/:id", verifyToken, DietController.edit_food);
router.patch("/edit-foods/:id", verifyToken, imageUpload.single("image"), DietController.edit_foods);
router.delete("/delete-diet/:id", verifyToken, DietController.delete_diet_by_id);
router.delete("/delete-food/:id", verifyToken, DietController.delete_food_by_id);

export default router;
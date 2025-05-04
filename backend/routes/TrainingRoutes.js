import routerEX from 'express';
import TrainingController from '../controllers/TrainingController.js';
// middlewares
import verifyToken from '../helpers/check-token.js';
import { imageUpload } from '../helpers/image-upload.js';

const router = routerEX.Router() 

router.get("/create-training", verifyToken, TrainingController.create_training);
router.post("/create-group", verifyToken, TrainingController.create_group);
router.post("/create-exercise", verifyToken, TrainingController.create_exercise);
router.patch("/create-exercises", verifyToken, imageUpload.single("image"), TrainingController.create_exercises);
// router.get("/get-diet", verifyToken, DietController.get_diet);
// router.get("/get-snacks", verifyToken, DietController.get_snacks);
// router.get("/get-food", verifyToken, DietController.get_food);
// router.get("/get-foods", verifyToken, DietController.get_foods);
// router.post("/edit-snacks/:id", verifyToken, DietController.edit_snack);
// router.post("/edit-food/:id", verifyToken, DietController.edit_food);
// router.patch("/edit-foods/:id", verifyToken, imageUpload.single("image"), DietController.edit_foods);
router.delete("/delete-training/:id", verifyToken, TrainingController.delete_training_by_id);
router.delete("/delete-exercise/:id", verifyToken, TrainingController.delete_exercise_by_id);

export default router;
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
router.get("/get-training", verifyToken, TrainingController.get_training);
router.get("/get-group", verifyToken, TrainingController.get_group);
router.get("/get-exercise", verifyToken, TrainingController.get_exercise);
router.get("/get-exercises", verifyToken, TrainingController.get_exercises);
router.post("/edit-group/:id", verifyToken, TrainingController.edit_group);
router.post("/edit-exercise/:id", verifyToken, TrainingController.edit_exercise);
router.patch("/edit-exercises/:id", verifyToken, imageUpload.single("image"), TrainingController.edit_exercises);
router.delete("/delete-training/:id", verifyToken, TrainingController.delete_training_by_id);
router.delete("/delete-exercise/:id", verifyToken, TrainingController.delete_exercise_by_id);

export default router;
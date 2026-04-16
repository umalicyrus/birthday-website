import { Router } from "express";
import { PhotoController } from "../controllers/photo.controller";
import { upload } from "../config/multer";

const router = Router();

// Upload single image
router.post("/upload", upload.single("image"), PhotoController.upload);

// Get all photos per event
router.get("/event/:eventId", PhotoController.getByEvent);

export default router;

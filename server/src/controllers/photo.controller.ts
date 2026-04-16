import { Request, Response } from "express";
import { PhotoService } from "../services/photo.service";

export const PhotoController = {
  async upload(req: Request, res: Response) {
    try {
      const eventId = Number(req.body.event_id);
      const file = req.file;

      if (!file) {
        return res.status(400).json({ message: "No file uploaded" });
      }

      const result = await PhotoService.savePhoto(
        eventId,
        file.filename,
        file.path,
      );
      res.json({
        message: "Photo uploaded sucessfully",
        result,
      });
    } catch (err) {
      res.status(500).json({ error: err });
    }
  },

  async getByEvent(req: Request, res: Response) {
    const eventId = Number(req.params.eventId);
    const photos = await PhotoService.getPhotosByEvent(eventId);

    res.json(photos);
  },
};

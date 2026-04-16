import { db } from "../config/db";

export const PhotoService = {
  async savePhoto(eventId: number, filename: string, filepath: string) {
    const [result] = await db.query(
      "INSERT INTO photos(event_id, filename, filepath) VALUES (?, ?, ?)",
      [eventId, filename, filepath],
    );
    return result;
  },

  async getPhotosByEvent(eventId: number) {
    const [rows] = await db.query("SELECT * FROM photos WHERE event_id = ?", [
      eventId,
    ]);
    return rows;
  },
};

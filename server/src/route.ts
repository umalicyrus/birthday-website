import { Router } from "express";
import { db } from "./config/db";

const router = Router();

// TEST API
router.get("/", (req, res) => {
  res.send("API Working 🚀");
});

// GET EVENTS
router.get("/events", async (req, res) => {
  try {
    const [rows] = await db.query("SELECT * FROM events");
    res.json(rows);
  } catch (err) {
    res.status(500).json({ error: err });
  }
});

// CREATE EVENT
router.post("/events", async (req, res) => {
  try {
    const { name, date, description } = req.body;

    const [result]: any = await db.query(
      "INSERT INTO events (name, date, description) VALUES (?, ?, ?)",
      [name, date, description],
    );

    res.json({ message: "Event created", result });
  } catch (err) {
    res.status(500).json({ error: err });
  }
});

export default router;

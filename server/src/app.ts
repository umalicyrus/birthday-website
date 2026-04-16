import express from "express";
import cors from "cors";

import photoRoutes from "./routes/photo.routes";

const app = express();

app.use(cors());
app.use(express.json());

// IMPORTANT: allow access to uploaded images
app.use("/uploads", express.static("uploads"));
app.use("/api/photos", photoRoutes);

export default app;

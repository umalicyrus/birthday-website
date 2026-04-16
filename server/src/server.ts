import app from "./app";
import routes from "./route";
import dotenv from "dotenv";
import { db } from "./config/db";

dotenv.config();

const PORT = process.env.PORT || 5000;

// routes
app.use("/api", routes);

// test DB connection
(async () => {
  try {
    await db.getConnection();
    console.log("MySQL Connected ✅");
  } catch (err) {
    console.log("DB Error ❌", err);
  }
})();

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

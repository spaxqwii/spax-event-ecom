import express from "express";
import productRoutes from "./routes/product";
import pool from "./db";

const app = express();
app.use(express.json());
app.use("/api", productRoutes);

const PORT = process.env.PORT || 8080;
app.listen(PORT, async () => {
  try {
    await pool.query("SELECT 1"); // quick DB connectivity test
    console.log(`✅ Product-service running on port ${PORT}`);
  } catch (err) {
    console.error("❌ Failed to connect to DB:", err);
    process.exit(1);
  }
});


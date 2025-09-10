import { Router, Request, Response } from "express";
import pool from "./db";

const router = Router();

// List products
router.get("/products", async (_, res: Response) => {
  const result = await pool.query("SELECT * FROM products ORDER BY id ASC");
  res.json(result.rows);
});

// Add a product
router.post("/products", async (req: Request, res: Response) => {
  const { name, price } = req.body;
  if (!name || !price) {
    return res.status(400).json({ error: "name and price required" });
  }

  try {
    const result = await pool.query(
      "INSERT INTO products(name, price) VALUES($1, $2) RETURNING *",
      [name, price]
    );
    res.status(201).json(result.rows[0]);
  } catch (err: any) {
    console.error("DB insert error:", err.message);
    res.status(500).json({ error: "db error" });
  }
});

export default router;

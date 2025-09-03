import { Router, Request, Response } from "express";
import pool from "./db";

const router = Router();

// Healthcheck
router.get("/healthz", (_: Request, res: Response) => res.json({ status: "ok" }));

// List users
router.get("/users", async (_: Request, res: Response) => {
  try {
    const result = await pool.query("SELECT id, email FROM users");
    res.json(result.rows);
  } catch (err) {
    console.error("DB ERROR:", err);
    res.status(500).json({
      error: "db error",
      details: (err as Error).message
    });
  }
});

// Add user
router.post("/users", async (req: Request, res: Response) => {
  const { email } = req.body;
  if (!email) return res.status(400).json({ error: "email required" });

  try {
    const result = await pool.query(
      "INSERT INTO users(email) VALUES($1) RETURNING id, email",
      [email]
    );
    res.status(201).json(result.rows[0]);
  } catch (err) {
    const e = err as { code?: string; message?: string };
    console.error("DB insert error:", e.message);

    // Check for duplicate email violation
    if (e.code === "23505") {
      return res.status(409).json({ error: "email already exists" });
    }

    res.status(500).json({ error: "db error" });
  }
});

export default router;

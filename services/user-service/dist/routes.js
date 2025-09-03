"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const db_1 = __importDefault(require("./db"));
const router = (0, express_1.Router)();
// Healthcheck
router.get("/healthz", (_, res) => res.json({ status: "ok" }));
// List users
router.get("/users", async (_, res) => {
    try {
        const result = await db_1.default.query("SELECT id, email FROM users");
        res.json(result.rows);
    }
    catch (err) {
        console.error("DB ERROR:", err);
        res.status(500).json({
            error: "db error",
            details: err.message
        });
    }
});
// Add user
router.post("/users", async (req, res) => {
    const { email } = req.body;
    if (!email)
        return res.status(400).json({ error: "email required" });
    try {
        const result = await db_1.default.query("INSERT INTO users(email) VALUES($1) RETURNING id, email", [email]);
        res.status(201).json(result.rows[0]);
    }
    catch (err) {
        console.error("DB insert error (raw):", err);
        const pgErr = err;
        if (pgErr && pgErr.code === "23505") {
            return res.status(409).json({ error: "email already exists" });
        }
        res.status(500).json({ error: "db error" });
    }
});
exports.default = router;

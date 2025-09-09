"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const routes_1 = __importDefault(require("./routes"));
const node_pg_migrate_1 = require("node-pg-migrate");
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.use("/", routes_1.default);
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
    console.log(`User-service running on port ${PORT}`);
});
await (0, node_pg_migrate_1.run)({
    databaseUrl: process.env.DATABASE_URL,
    dir: "migrations",
    migrationsTable: "pgmigrations"
});

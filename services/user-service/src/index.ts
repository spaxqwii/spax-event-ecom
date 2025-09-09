import express from "express";
import routes from "./routes";
import { run } from "node-pg-migrate";


const app = express();
app.use(express.json());
app.use("/", routes);
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`User-service running on port ${PORT}`);
});

await run({
  databaseUrl: process.env.DATABASE_URL!,
  dir: "migrations",
  migrationsTable: "pgmigrations"
});
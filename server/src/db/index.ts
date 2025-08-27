import { createClient } from "@libsql/client";
import Database from "bun:sqlite";

const db = new Database("habits.sqlite");

// const db = createClient({
//   url: process.env.TURSO_DB_URL!,
//   authToken: process.env.TURSO_DB_TOKEN!,
// })

export default db;

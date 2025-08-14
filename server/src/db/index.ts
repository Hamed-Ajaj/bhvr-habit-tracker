import Database from "bun:sqlite";

const db = new Database("habits.sqlite");

export default db;

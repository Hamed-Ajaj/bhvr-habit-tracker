import db from "./index";

// db.run(`DROP TABLE IF EXISTS habits`);

// Create habits table
db.run(`
  CREATE TABLE IF NOT EXISTS habits (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    user_id TEXT NOT NULL,
    name TEXT NOT NULL,
    description TEXT,
    frequency TEXT DEFAULT 'daily',
    start_date TEXT DEFAULT CURRENT_DATE,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
  )
`);

// TODO: add tags columns

// Create todos table
db.run(`
  CREATE TABLE IF NOT EXISTS todos (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    title TEXT NOT NULL,
    completed INTEGER DEFAULT 0,
    user_id TEXT NOT NULL,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
  )
`);

// habit logs table
db.run(`
CREATE TABLE IF NOT EXISTS habit_logs (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  habit_id INTEGER NOT NULL,
  date TEXT NOT NULL DEFAULT CURRENT_DATE,
  completed INTEGER DEFAULT 1,
  FOREIGN KEY (habit_id) REFERENCES habits(id) ON DELETE CASCADE
);
`)

// focus sessions table
db.run(`
CREATE TABLE IF NOT EXISTS sessions (
id INTEGER PRIMARY KEY AUTOINCREMENT,
duration INTEGER NOT NULL,
date TEXT NOT NULL DEFAULT CURRENT_DATE
);
`)


// challenges table
db.run(`
CREATE TABLE IF NOT EXISTS challenges (
id INTEGER PRIMARY KEY AUTOINCREMENT,
name TEXT NOT NULL,
description TEXT,
month TEXT NOT NULL,
created_at DATETIME DEFAULT CURRENT_TIMESTAMP
);
  `)

console.log("✅ Tables created successfully");

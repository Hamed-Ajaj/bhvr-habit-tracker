import db from "./index";



// Create habits table
db.run(`
  CREATE TABLE IF NOT EXISTS habits (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    description TEXT,
    frequency TEXT DEFAULT 'daily',
    start_date TEXT DEFAULT CURRENT_DATE,
    completed INTEGER DEFAULT 0
  )
`);

// TODO: add tags columns

// Create todos table
db.run(`
  CREATE TABLE IF NOT EXISTS todos (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    title TEXT NOT NULL,
    completed INTEGER DEFAULT 0
  )
`);

console.log("✅ Tables created successfully");

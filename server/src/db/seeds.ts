import db from ".";

db.run(`
  INSERT OR IGNORE INTO todos ( title, completed) VALUES
    ( 'test', true)
`)

// db.run(`INSERT OR IGNORE INTO habits 
//   (name, description, frequency, start_date, completed) 
// VALUES
//   ('Exercise', '30 minutes of cardio', 'daily', '2023-10-01', 0),
//   ('Read Book', 'Read 20 pages', 'daily', '2023-10-01', 0),
//   ('Meditation', '10 minutes mindfulness', 'daily', '2023-10-01', 0);`)


db.run(`
  INSERT INTO habit_logs (habit_id, date, completed)
  VALUES
    (1, DATE('now'), 1),          -- Exercise done today
    (2, DATE('now', '-1 day'), 1),-- Read Book done yesterday
    (3, DATE('now'), 1),          -- Meditate done today
    (1, DATE('now', '-2 day'), 1) -- Exercise done 2 days ago

`);

console.log("✅ Seeded successfully");


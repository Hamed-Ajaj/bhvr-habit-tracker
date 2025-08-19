import db from ".";

db.run(`
  INSERT OR IGNORE INTO todos ( title, completed) VALUES
    ( 'test', true)
`)

db.run(`INSERT OR IGNORE INTO habits 
  (name, description, frequency, start_date, completed) 
VALUES
  ('Exercise', '30 minutes of cardio', 'daily', '2023-10-01', 0),
  ('Read Book', 'Read 20 pages', 'daily', '2023-10-01', 0),
  ('Meditation', '10 minutes mindfulness', 'daily', '2023-10-01', 0);`)


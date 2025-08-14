import db from ".";

db.run(`
  INSERT OR IGNORE INTO todos ( title, completed) VALUES
    ( 'test', true)
`)


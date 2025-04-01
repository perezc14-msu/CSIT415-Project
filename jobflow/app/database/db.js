import path from 'path';
import Database from 'better-sqlite3';

// Get the absolute path to the database file
const dbPath = path.resolve('app/database', 'jobflow.db'); // Ensure correct path

const db = new Database(dbPath, { verbose: console.log });

// Create the table if it doesn't exist
db.exec(`
  CREATE TABLE IF NOT EXISTS jobs (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    user_id TEXT NOT NULL,
    company TEXT NOT NULL,
    position TEXT NOT NULL,
    status TEXT NOT NULL,
    applied_date TEXT,
    location TEXT,
    interview_date TEXT
  )
`);

export default db;

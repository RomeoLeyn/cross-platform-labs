import { SQLiteDatabase } from "expo-sqlite";

export const createTimeEntriesTable = async (db: SQLiteDatabase) => {
  try {
    await db.execAsync(
      `CREATE TABLE IF NOT EXISTS services (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                name TEXT NOT NULL,
                email TEXT,
                password TEXT
            );`
    );
    console.log("Time entries table ensured.");
  } catch (error) {
    console.error("Failed to create time_entries table", error);
  }
};

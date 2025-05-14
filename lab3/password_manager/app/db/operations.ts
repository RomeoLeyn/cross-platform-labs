import { SQLiteDatabase } from "expo-sqlite";
import { Alert } from "react-native";

export interface Service {
    id: number;
    name: string;
    email: string;
    password: string;
}

export const initDB = async (db: SQLiteDatabase): Promise<void> => {
    try {
        await db.execAsync(
            `CREATE TABLE IF NOT EXISTS services (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                name TEXT NOT NULL,
                email TEXT,
                password TEXT
            )`
        );
        console.log("Services table ensured.");
    } catch (error) {
        console.error("Failed to create services table", error);
        throw error;
    }
};

export const insertService = async (db: SQLiteDatabase, name: string, email: string, password: string): Promise<number> => {
    try {
        const { insertId } = await db.runAsync(
            `INSERT INTO services (name, email, password) VALUES (?, ?, ?)`,
            [name, email, password]
        );
        console.log("Service inserted.");
        return insertId || 0;
    } catch (error) {
        console.error("Failed to insert service", error);
        throw error;
    }
};

export const fetchServices = async (db: SQLiteDatabase): Promise<Service[]> => {
    try {
        const rows = await db.getAllAsync<Service>(
            `SELECT * FROM services`
        );
        return rows;
    } catch (error) {
        console.error("Failed to fetch services", error);
        throw error;
    }
};

export const deleteService = async (db: SQLiteDatabase, id: number): Promise<void> => {
    try {
        Alert.alert("Delete", "Are you sure?", [
            { text: "Cancel", style: "cancel" },
            {
                text: "Delete",
                style: "destructive",
                onPress: async () => {
                    await db.runAsync(`DELETE FROM services WHERE id = ?`, [id]);
                    console.log("Service deleted.");
                },
            },
        ])

    } catch (error) {
        console.error("Failed to delete service", error);
        throw error;
    }
};
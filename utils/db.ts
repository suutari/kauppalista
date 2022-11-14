import * as sqlite from 'sqlite';
import sqlite3 from 'sqlite3';

async function getDatabase() {
    const db: sqlite.Database = await sqlite.open({
        filename: 'database.db',
        driver: sqlite3.Database,
    });

    await db.exec(`
    CREATE TABLE IF NOT EXISTS shoplist (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name VARCHAR(100)
    )`);

    return new Database(db);
}

class Database {
    db: sqlite.Database;

    constructor(db: sqlite.Database) {
        this.db = db;
    }

    async createShopList(name: string) {
        await this.db.run('INSERT INTO shoplist (name) VALUES (?)', name);
        //const result = await db.all('SELECT * FROM testi');
    }
}

#!/usr/bin/env -S npx ts-node --project node.tsconfig.json

import * as sqlite from 'sqlite';
import sqlite3 from 'sqlite3';
import {ShopList, ShopListItem} from './types';

export async function getDatabase(): Promise<Database> {
    const db: sqlite.Database = await sqlite.open({
        filename: 'database.db',
        driver: sqlite3.Database,
    });

    await db.exec(`
    CREATE TABLE IF NOT EXISTS shoplist (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name VARCHAR(100) NOT NULL,
        created_at DATETIME NOT NULL
    )`);
    await db.exec(`
    CREATE TABLE IF NOT EXISTS shoplist_item (
        list_id INTEGER NOT NULL,
        sequence INTEGER NOT NULL,
        done BOOLEAN NOT NULL DEFAULT 0,
        item VARCHAR(200) NOT NULL,
        PRIMARY KEY (list_id, sequence)
    )`);

    return new Database(db);
}

export class Database {
    db: sqlite.Database;

    constructor(db: sqlite.Database) {
        this.db = db;
    }

    async createShopList(name: string): Promise<number> {
        const result = await this.db.run(
            `INSERT INTO shoplist (name, created_at)
             VALUES (?, datetime('now'))`,
            name
        );
        return result.lastID!;
    }

    async addItemToList(listId: number, item: string): Promise<number> {
        const result = await this.db.get(
            `SELECT MAX(sequence) AS maxSeq FROM shoplist_item
             WHERE list_id = ?`,
            listId
        );
        const maxSeq: number = result.maxSeq ?? 0;
        const sequence = maxSeq + 1;

        this.db.run(
            `INSERT INTO shoplist_item (list_id, sequence, item)
             VALUES (?, ?, ?)`,
            listId,
            sequence,
            item
        );
        return sequence;
    }

    async getListItem(
        listId: number,
        sequence: number
    ): Promise<ShopListItem> {
        const row = await this.db.get(
            'SELECT * FROM shoplist_item WHERE list_id=? AND sequence=?',
            listId,
            sequence
        );
        return {
            listId: row.list_id,
            sequence: row.sequence,
            text: row.item,
            done: row.done ? true : false,
        };
    }

    async getShopLists(): Promise<ShopList[]> {
        const rows = await this.db.all('SELECT * FROM shoplist');
        return rows.map((row) => ({
            id: row.id,
            name: row.name,
            createdAt: new Date(row.created_at + 'Z'),
        }));
    }

    async getShopList(listId: number): Promise<ShopList> {
        const row = await this.db.get(
            'SELECT * FROM shoplist WHERE id=?',
            listId
        );
        return {
            id: row.id,
            name: row.name,
            createdAt: new Date(row.created_at + 'Z'),
        };
    }

    async getListItems(listId: number): Promise<ShopListItem[]> {
        const rows = await this.db.all(
            'SELECT * FROM shoplist_item WHERE list_id=?',
            listId
        );
        return rows.map((row) => ({
            listId: row.list_id,
            sequence: row.sequence,
            text: row.item,
            done: row.done ? true : false,
        }));
    }
}

async function kokeile() {
    const db = await getDatabase();
    const listaId = await db.createShopList('Testilista');
    console.log(listaId);
    await db.addItemToList(listaId, 'eka rivi');
    await db.addItemToList(listaId, 'toka rivi');
    await db.addItemToList(listaId, 'kolmas rivi');
    const listat = await db.getShopLists();
    console.log(`${listat[0].createdAt}`);
    const ekanListanIteemit = await db.getListItems(listat[0].id);
    console.log(ekanListanIteemit);
}

// kokeile();

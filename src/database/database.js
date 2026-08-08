import { DatabaseSync } from 'node:sqlite'

export const database = new DatabaseSync('products.db')

database.exec(`
  CREATE TABLE IF NOT EXISTS products (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    price REAL NOT NULL
  )
`)
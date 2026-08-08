import { database } from '../database/database.js'

export function createProduct(name, price) {
  const statement = database.prepare(`
    INSERT INTO products (name, price)
    VALUES (?, ?)
  `)

  const result = statement.run(name, price)

  return findProductById(Number(result.lastInsertRowid))
}

export function findProductByName(name) {
  const statement = database.prepare(`
    SELECT id, name, price
    FROM products
    WHERE LOWER(name) = LOWER(?)
  `)

  return statement.get(name.trim())
}

export function findProductById(productId) {
  const statement = database.prepare(`
    SELECT id, name, price
    FROM products
    WHERE id = ?
  `)

  return statement.get(productId)
}

export function deleteProductById(productId) {
  const statement = database.prepare(`
    DELETE FROM products
    WHERE id = ?
  `)

  const result = statement.run(productId)

  return result.changes > 0
}

export function updateProductById(productId, name, price) {
  const statement = database.prepare(`
    UPDATE products
    SET name = ?, price = ?
    WHERE id = ?
  `)

  const result = statement.run(name.trim(), price, productId)

  if (result.changes === 0) return undefined

  return findProductById(productId)
}

export function findAllProducts() {
  const statement = database.prepare(`
    SELECT id, name, price
    FROM products
    ORDER BY id ASC
  `)

  return statement.all()
}

export function findProductsByFilters( search, maxPrice ) {
  const statement = database.prepare(`
    SELECT id, name, price
    FROM products
    WHERE name LIKE ? AND price <= ?
    ORDER BY id ASC
  `)

  return statement.all(`%${search.trim()}%`, maxPrice)
}

export function findProductsByName(search) {
  const statement = database.prepare(`
    SELECT id, name, price
    FROM products
    WHERE name LIKE ?
    ORDER BY id ASC
  `)

  return statement.all(`%${search.trim()}%`)
}

export function findProductsByMaxPrice(maxPrice) {
  const statement = database.prepare(`
    SELECT id, name, price
    FROM products
    WHERE price <= ?
    ORDER BY id ASC
  `)

  return statement.all(maxPrice)
}
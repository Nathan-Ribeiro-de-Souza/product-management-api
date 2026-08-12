import { database } from '../database/database.js'

export async function createProduct(name, price) {
  const result = await database.query(`
    INSERT INTO products (name,price)
    VALUES ($1, $2)
    RETURNING id, name, price::float8 AS price`,
  [name, price])

  return result.rows[0]
}

export async function findProductByName(name) {
  const result = await database.query(`
    SELECT id, name, price::float8 AS price FROM products
    WHERE LOWER(name) = LOWER($1)`
  ,[name.trim()])

  return result.rows[0]
}

export async function findProductById(productId) {
  const result = await database.query(`
    SELECT id, name, price::float8 AS price FROM products
    WHERE id = $1`,
  [productId])

  return result.rows[0]
}

export async function deleteProductById(productId) {
  const result = await database.query(`
    DELETE FROM products
    WHERE id = $1`,
  [productId])

  return result.rowCount > 0
}

export async function updateProductById(productId, name, price) {
  const result = await database.query(`
    UPDATE products
    SET name = $1, price = $2
    WHERE id = $3
    RETURNING id, name, price::float8 AS price`,
  [name.trim(), price, productId])

  return result.rows[0]
}

export async function findAllProducts() {
  const result = await database.query(`
    SELECT id, name, price::float8 AS price FROM products
    ORDER BY id ASC`)

    return result.rows
}

export async function findProductsByFilters( search, maxPrice ) {
  const result = await database.query(`
    SELECT id, name, price::float8 AS price FROM products
    WHERE name ILIKE $1 AND price <= $2
    ORDER BY id ASC`,
  [`%${search.trim()}%`, maxPrice])

  return result.rows
}

export async function findProductsByName(search) {
  const result = await database.query(`
    SELECT id, name, price::float8 AS price FROM products
    WHERE name ILIKE $1
    ORDER BY id ASC
    `, [`%${search.trim()}%`])

    return result.rows
}

export async function findProductsByMaxPrice(maxPrice) {
  const result = await database.query(`
    SELECT id, name, price::float8 AS price FROM products
    WHERE price <= $1
    ORDER BY id ASC`
  ,[maxPrice])

  return result.rows
}
import {
  createProduct as createProductRepository,
  deleteProductById,
  findAllProducts,
  findProductById as findProductByIdRepository,
  findProductByName as findProductByNameRepository,
  findProductsByFilters,
  findProductsByMaxPrice,
  findProductsByName,
  updateProductById
} from '../repositories/products.repository.js'

export function getProducts(search, maxPrice) {
  const hasSearch =
    typeof search === 'string' && search.trim() !== ''

  const hasMaxPrice = maxPrice !== undefined

  if (hasSearch && hasMaxPrice) {
    return findProductsByFilters(search, maxPrice)
  }

  if (hasSearch) {
    return findProductsByName(search)
  }

  if (hasMaxPrice) {
    return findProductsByMaxPrice(maxPrice)
  }

  return findAllProducts()
}

export function getProductById(productId) {
  return findProductByIdRepository(productId)
}

export function getProductByName(name) {
  return findProductByNameRepository(name)
}

export function createProduct(name, price) {
  return createProductRepository(name.trim(), price)
}

export function updateProduct(productId, name, price) {
  const product = findProductByIdRepository(productId)

  if (!product) return undefined

  const updatedName =
    name !== undefined ? name.trim() : product.name

  const updatedPrice =
    price !== undefined ? price : product.price

  return updateProductById(productId, updatedName, updatedPrice )
}

export function deleteProduct(productId) {
  const product = findProductByIdRepository(productId)

  if (!product) return undefined

  deleteProductById(productId)

  return product
}

export function replaceProduct(productId, name, price) {
  return updateProductById(productId, name, price)
}
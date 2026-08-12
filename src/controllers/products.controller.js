import {
  createProduct as createProductService,
  deleteProduct as deleteProductService,
  getProductById as getProductByIdService,
  getProductByName,
  getProducts,
  replaceProduct as replaceProductService,
  updateProduct as updateProductService
} from '../services/products.service.js'

function parseProductId(value) {
  const productId = Number(value)

  if (!Number.isInteger(productId) || productId <= 0) {
    return undefined
  }

  return productId
}

export async function listProducts(request, response) {
  const { search, maxPrice } = request.query

  const parsedMaxPrice =
    maxPrice === undefined ? undefined : Number(maxPrice)

  if (
    parsedMaxPrice !== undefined &&
    (Number.isNaN(parsedMaxPrice) || parsedMaxPrice < 0)
  ) {
    return response.status(400).json({
      error: 'maxPrice must be a valid non-negative number'
    })
  }

  const products = await getProducts(search, parsedMaxPrice)

  return response.status(200).json({
    products
  })
}

export async function getProductById(request, response) {
  const productId = parseProductId(request.params.id)

  if (!productId) {
    return response.status(400).json({
      error: 'Invalid product ID'
    })
  }

  const product = await getProductByIdService(productId)

  if (!product) {
    return response.status(404).json({
      error: 'Product not found'
    })
  }

  return response.status(200).json(product)
}

export async function createProduct(request, response) {
  const { name, price } = request.body

  if (
    typeof name !== 'string' ||
    name.trim() === '' ||
    typeof price !== 'number' ||
    price < 0
  ) {
    return response.status(400).json({
      error: 'Valid name and price are required'
    })
  }

  const productAlreadyExists = await getProductByName(name)

  if (productAlreadyExists) {
    return response.status(409).json({
      error: 'A product with this name already exists'
    })
  }

  const newProduct = await createProductService(name, price)

  return response.status(201).json(newProduct)
}

export async function updateProduct(request, response) {
  const productId = parseProductId(request.params.id)
  const { name, price } = request.body

  if (!productId) {
    return response.status(400).json({
      error: 'Invalid product ID'
    })
  }

  if (name === undefined && price === undefined) {
    return response.status(400).json({
      error: 'Send at least a name or price'
    })
  }

  if (
    name !== undefined &&
    (typeof name !== 'string' || name.trim() === '')
  ) {
    return response.status(400).json({
      error: 'Invalid product name'
    })
  }

  if (
    price !== undefined &&
    (typeof price !== 'number' || price < 0)
  ) {
    return response.status(400).json({
      error: 'Invalid product price'
    })
  }

  const updatedProduct = await updateProductService(productId, name, price)

  if (!updatedProduct) {
    return response.status(404).json({
      error: 'Product not found'
    })
  }

  return response.status(200).json(updatedProduct)
}

export async function deleteProduct(request, response) {
  const productId = parseProductId(request.params.id)

  if (!productId) {
    return response.status(400).json({
      error: 'Invalid product ID'
    })
  }

  const deletedProduct = await deleteProductService(productId)

  if (!deletedProduct) {
    return response.status(404).json({
      error: 'Product not found'
    })
  }

  return response.status(200).json({
    message: 'Product deleted successfully',
    product: deletedProduct
  })
}

export async function replaceProduct(request, response) {
  const productId = parseProductId(request.params.id)
  const { name, price } = request.body

  if (!productId) {
    return response.status(400).json({
      error: 'Invalid product ID'
    })
  }

  if (
    typeof name !== 'string' ||
    name.trim() === '' ||
    typeof price !== 'number' ||
    price < 0
  ) {
    return response.status(400).json({
      error: 'Valid name and price are required'
    })
  }

  const replacedProduct = await replaceProductService(productId, name, price)

  if (!replacedProduct) {
    return response.status(404).json({
      error: 'Product not found'
    })
  }

  return response.status(200).json(replacedProduct)
}
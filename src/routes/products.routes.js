import { Router } from 'express'
import {
  createProduct,
  deleteProduct,
  getProductById,
  listProducts,
  replaceProduct,
  updateProduct
} from '../controllers/products.controller.js'

const router = Router()

router.get('/', listProducts)
router.get('/:id', getProductById)
router.post('/', createProduct)
router.patch('/:id', updateProduct)
router.delete('/:id', deleteProduct)
router.put('/:id', replaceProduct)

export default router
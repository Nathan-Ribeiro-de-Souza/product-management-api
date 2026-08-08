import express from 'express'
import productsRouter from './routes/products.routes.js'

const app = express()
const PORT = 3000

app.use(express.json())

app.get('/health', (request, response) => {
  return response.status(200).json({
    status: 'ok'
  })
})

app.use('/products', productsRouter)

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`)
})
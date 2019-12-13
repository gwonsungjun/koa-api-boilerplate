import { Router } from 'express'
import products from './products'

const routes = new Router()

routes.use('/products', products)
routes.get('/health-check', (req, res) => res.status(200).json({ healthy: true }))

export default routes

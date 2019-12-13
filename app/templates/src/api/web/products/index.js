import { Router } from 'express'
import { createProduct } from './controller'

const router = new Router()

router.post('/', createProduct)

export default router

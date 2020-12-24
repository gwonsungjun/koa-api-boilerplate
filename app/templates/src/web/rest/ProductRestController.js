import { route, GET, POST, PATCH, DELETE } from 'awilix-koa'
import util from 'util'

@route('/products')
export default class ProductRestController {
  constructor(productService) {
    this.productService = productService
  }

  @GET()
  findProducts = async ctx => {
    const { start = 0, count = 10 } = ctx.request.query

    const { items, total } = await this.productService.findProducts(start, count)

    return ctx.success({ items, start, count, total })
  }

  @POST()
  createProduct = async ctx => {
    await this._validateProduct(ctx)

    try {
      const { productName, description, price, isDisplay } = ctx.request.body

      const product = await this.productService.createProduct(productName, description, price, isDisplay)

      return ctx.success({ ...product })
    } catch (error) {
      if (error.message === 'ValidationError') {
        return ctx.throw(400, error.details)
      }

      throw error
    }
  }

  @PATCH()
  @route('/:productId')
  updateProduct = async ctx => {
    await this._validateProductId(ctx)

    try {
      const { productName, description, price, isDisplay } = ctx.request.body
      const { productId } = ctx.params

      const product = await this.productService.updateProduct(productId, productName, description, price, isDisplay)

      return ctx.success({ ...product })
    } catch (error) {
      if (error.message === 'ValidationError') {
        return ctx.throw(400, error.details)
      }

      if (error.message === 'NotFoundError') {
        return ctx.throw(404, error.details)
      }

      throw error
    }
  }

  @DELETE()
  @route('/:productId')
  deleteProduct = async ctx => {
    await this._validateProductId(ctx)

    try {
      const { productId } = ctx.params

      await this.productService.deleteProduct(productId)
      ctx.status = 204
    } catch (error) {
      if (error.message === 'NotFoundError') {
        return ctx.throw(404, error.details)
      }

      throw error
    }
  }

  _validateProduct = async ctx => {
    ctx.checkBody('productName', 'Invalid productName').notEmpty()
    ctx.checkBody('description', 'Invalid description').notEmpty()
    ctx
      .checkBody('price', 'Invalid price')
      .notEmpty()
      .isInt()
    ctx.checkBody('isDisplay', 'Invalid isDisplay').notEmpty()

    const errors = await ctx.validationErrors()

    if (errors) {
      return ctx.throw(400, `There have been validation errors: ${util.inspect(errors)}`)
    }
  }

  _validateProductId = async ctx => {
    ctx
      .checkParams('productId')
      .notEmpty()
      .isInt()

    const errors = await ctx.validationErrors()

    if (errors) {
      return ctx.throw(400, `There have been validation errors: ${util.inspect(errors)}`)
    }
  }
}

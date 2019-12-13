import { success } from '../../common/response'
import { ProductDomain } from '../../core/products/domain/productDomain'
import { ProductDao } from '../../core/products/infrastructure/productDao'

export const createProduct = async (req, res, next) => {
  const productReqInfo = req.body

  try {
    const productDomain = new ProductDomain(new ProductDao())
    const productInfo = await productDomain.createProduct(productReqInfo)

    return success(res, 201)({ ...productInfo })
  } catch (e) {
    next(e)
  }
}

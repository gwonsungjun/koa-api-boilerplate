import { ProductPriceException } from './productPriceException'

export class ProductDomain {
  constructor(dao) {
    this.dao = dao
  }

  createProduct(productReqInfo) {
    const { price } = productReqInfo

    if (!price || price < 0) {
      throw new ProductPriceException()
    }

    return this.dao.createProduct(productReqInfo)
  }
}

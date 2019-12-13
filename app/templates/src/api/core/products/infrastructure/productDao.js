import { Product } from '../models'

export class ProductDao {
  async createProduct(productReqInfo) {
    const productInfo = await Product.create(productReqInfo)
    return productInfo.toJSON()
  }
}

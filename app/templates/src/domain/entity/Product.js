import { attributes } from 'structure'
import { ProductPriceException } from './ProductPriceException'

const Product = attributes({
  productId: { type: Number },
  productName: { type: String, require: true },
  description: { type: String, require: true },
  price: { type: Number, require: true },
  isDisplay: { type: Boolean, require: true },
  deleted: { type: Boolean },
  createdAt: { type: Date },
  updatedAt: { type: Date },
  deletedAt: { type: Date },
})(
  class Product {
    validatePrice() {
      if (this.price < 0) {
        throw new ProductPriceException()
      }
    }
  },
)

export default Product

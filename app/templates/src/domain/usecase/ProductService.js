import Product from 'domain/entity/Product'
import { ProductNotFoundException } from './ProductNotFoundException'

export default class ProductService {
  constructor(sequelizeProductRepository) {
    this.productRepository = sequelizeProductRepository
  }

  findProducts = async (start, count) => {
    const isToEntity = true

    const { items, total } = await this.productRepository.findAndCountAll(start, count, isToEntity)

    return { items: items.map(it => it.attributes), total }
  }

  createProduct = async (productName, description, price, isDisplay) => {
    const product = new Product({ productName, description, price, isDisplay })
    product.validatePrice()

    const newProduct = await this.productRepository.create(product)

    return newProduct.attributes
  }

  updateProduct = async (productId, productName, description, price, isDisplay) => {
    const product = await this._findProduct(productId, false)
    product.productName = productName
    product.description = description
    product.price = price
    product.isDisplay = isDisplay

    const productEntity = new Product({ ...product.toJSON() })
    productEntity.validatePrice()

    const updatedProduct = await this.productRepository.save(product)

    return updatedProduct.attributes
  }

  deleteProduct = async productId => {
    await this._findProduct(productId, true)

    await this.productRepository.deleteByProductId(productId)
  }

  _findProduct = async (productId, isToEntity) => {
    const product = await this.productRepository.findByProductId(productId, isToEntity)

    if (!product) {
      throw new ProductNotFoundException()
    }

    return product
  }
}

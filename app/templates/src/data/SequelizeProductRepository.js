import ProductRepository from 'domain/entity/ProductRepository'
import { SequelizeProductMapper as productMapper } from './SequelizeProductMapper'

export default class SequelizeProductRepository extends ProductRepository {
  constructor(productModel) {
    super()
    this.productModel = productModel
  }

  findByProductId = async (productId, isToEntity) => {
    const product = await this.productModel.findOne({ where: { productId } })

    if (isToEntity && product) {
      return productMapper.toEntity(product)
    }

    return product
  }

  findAndCountAll = async (start, count, isToEntity) => {
    const options = { offset: start, limit: count }

    const { count: total, rows } = await this.productModel.findAndCountAll({ ...options })

    return {
      items: rows && isToEntity ? rows.map(productMapper.toEntity) : [],
      total: total || 0,
    }
  }

  create = async product => {
    const newProduct = await this.productModel.create(productMapper.toDatabase(product))

    return productMapper.toEntity(newProduct)
  }

  save = async product => {
    const updatedProduct = await product.save()

    return productMapper.toEntity(updatedProduct)
  }

  deleteByProductId = productId => this.productModel.destroy({ where: { productId } })
}

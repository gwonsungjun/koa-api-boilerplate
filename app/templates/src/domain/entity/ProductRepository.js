export default class ProductRepository {
  findByProductId = () => {
    throw new Error('override')
  }

  findAndCountAll = () => {
    throw new Error('override')
  }

  create = async () => {
    throw new Error('override')
  }

  save = async () => {
    throw new Error('override')
  }

  deleteByProductId = () => {
    throw new Error('override')
  }
}

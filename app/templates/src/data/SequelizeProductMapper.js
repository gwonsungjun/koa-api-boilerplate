import Product from 'domain/entity/Product'

export const SequelizeProductMapper = {
  toEntity({ dataValues }) {
    const {
      productId,
      productName,
      description,
      price,
      isDisplay,
      deleted,
      createdAt,
      updatedAt,
      deletedAt,
    } = dataValues

    return new Product({
      productId,
      productName,
      description,
      price,
      isDisplay,
      deleted,
      createdAt,
      updatedAt,
      deletedAt,
    })
  },

  toDatabase(dataValues) {
    const { productName, description, price, isDisplay } = dataValues

    return {
      productName,
      description,
      price,
      isDisplay,
    }
  },
}

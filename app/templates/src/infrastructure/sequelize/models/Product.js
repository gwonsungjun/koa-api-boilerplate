import { Model, DataTypes } from 'sequelize'

export default sequelize => {
  class Product extends Model {
    static associate() {}
  }

  Product.init(
    {
      productId: { type: DataTypes.BIGINT(20), allowNull: false, primaryKey: true, autoIncrement: true },
      productName: { type: DataTypes.STRING(255), allowNull: false },
      description: { type: DataTypes.STRING(500), allowNull: false },
      price: { type: DataTypes.DECIMAL(20, 2), allowNull: false },
      isDisplay: { type: DataTypes.BOOLEAN, allowNull: false, defaultValue: false },
      deleted: { type: DataTypes.BOOLEAN, allowNull: false, defaultValue: false },
      createdAt: { type: DataTypes.DATE, allowNull: false },
      updatedAt: { type: DataTypes.DATE, allowNull: true },
      deletedAt: { type: DataTypes.DATE, allowNull: true },
    },
    {
      tableName: 'product',
      modelName: 'product',
      underscoredAll: true,
      paranoid: true,
      timestamp: true,
      createdAt: 'createdAt',
      updatedAt: 'updatedAt',
      deletedAt: 'deletedAt',
      sequelize,
    },
  )

  return Product
}

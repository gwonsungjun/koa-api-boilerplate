import { Model, DataTypes } from 'sequelize'

export class Product extends Model {
  static associate() {}
}

export default sequelize => {
  return Product.init(
    {
      productId: { type: DataTypes.BIGINT(20), allowNull: false, primaryKey: true, autoIncrement: true },
      productName: { type: DataTypes.STRING(255), allowNull: false },
      description: { type: DataTypes.STRING(500), allowNull: false },
      price: { type: DataTypes.DECIMAL(20, 2), allowNull: false, defaultValue: '0.00' },
      isDisplay: { type: DataTypes.TINYINT(1), allowNull: false, defaultValue: '1' },
      createdAt: { type: DataTypes.DATE, allowNull: false },
      updatedAt: { type: DataTypes.DATE, allowNull: true },
      deletedAt: { type: DataTypes.DATE, allowNull: true },
    },
    {
      tableName: 'product',
      name: { singular: 'product', plural: 'product' },
      underscored: true,
      timestamp: true,
      createdAt: 'createdAt',
      updatedAt: 'updatedAt',
      deletedAt: 'deletedAt',
      indexes: [{ name: 'idx_product__is_display', fields: ['is_display'] }],
      sequelize,
    },
  )
}

module.exports = (factory, { Product }) => {
  factory.define('product', Product, {
    productId: factory.chance('integer'),
    productName: factory.chance('sentence'),
    description: factory.chance('sentence'),
    price: factory.chance('integer'),
    isDisplay: true,
    deleted: false,
    createdAt: factory.chance('date'),
    updatedAt: factory.chance('date'),
    deletedAt: null,
  })
}

import Product from 'domain/entity/Product'

describe('Product Entity test', () => {
  const productName = 'nike pants'
  const description = 'nike product'
  const isDisplay = true

  test('Product 엔티티를 생성할 수 있다.', async () => {
    const price = 20000

    const actual = new Product({ productName, description, price, isDisplay })

    expect(actual.productName).toBe(productName)
    expect(actual.description).toBe(description)
    expect(actual.price).toBe(price)
    expect(actual.isDisplay).toBe(isDisplay)
  })

  test('Product 가격이 0보다 작으면 예외를 반환할 수 있다.', async () => {
    const price = -20000

    try {
      new Product({ productName, description, price, isDisplay })
    } catch (error) {
      expect(error).toBe('ValidationError')
    }
  })
})

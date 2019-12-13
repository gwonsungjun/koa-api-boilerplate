import { ProductDomain } from '../../../../../src/api/core/products/domain/productDomain'
import { ProductPriceException } from '../../../../../src/api/core/products/domain/productPriceException'

describe('상품 도메인 테스트', () => {
  test('상품을 등록할 수 있다.', async () => {
    //given
    const productReqInfo = { productId: 2, productName: '테스트 상품', description: '테스트 상품 설명', price: 30000 }
    const productDomain = new ProductDomain(new FakeProductDao())

    //when
    const productInfo = await productDomain.createProduct(productReqInfo)

    //then
    expect(productInfo).not.toBeNull()
    expect(productInfo).not.toBeUndefined()
    expect(productInfo.productId).toBe(productReqInfo.productId)
  })

  test('상품 등록 시 가격이 음수이거나 없으면 안된다.', async () => {
    //given
    const productReqInfo = { productId: 2, productName: '테스트 상품', description: '테스트 상품 설명', price: -1000 }
    const productDomain = new ProductDomain(new FakeProductDao())

    //then
    expect(() => {
      productDomain.createProduct(productReqInfo)
    }).toThrow(ProductPriceException)
  })
})

class FakeProductDao {
  constructor() {
    this.productMap = new Map()
  }

  createProduct(productReqInfo) {
    const productId = productReqInfo.productId

    this.productMap.set(productId, productReqInfo)
    return this.productMap.get(productId)
  }
}

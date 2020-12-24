export class ProductNotFoundException {
  constructor() {
    const error = new Error('NotFoundError')
    error.details = '상품을 찾을 수 없습니다.'

    throw error
  }
}

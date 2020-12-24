export class ProductPriceException {
  constructor() {
    const error = new Error('ValidationError')
    error.details = '가격 정보가 올바르지 않습니다.'

    throw error
  }
}

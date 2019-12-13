export class ProductPriceException extends Error {
  constructor() {
    super('가격 정보가 올바르지 않습니다.')
  }
}

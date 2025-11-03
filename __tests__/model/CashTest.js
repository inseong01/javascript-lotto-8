import Cash from "../../src/model/Cash.js";

describe('Cash 클래스 테스트', () => {
  describe('인스턴스 생성', () => {
    test('1000원으로 나눠지지 않는 구입금액을 입력하면 예외를 반환한다.', () => {
      const inputs = ['12', 'false', '1001', '!'];

      inputs.forEach((input) => {
        function fnBox() {
          new Cash(input);
        }

        expect(fnBox).toThrow('[ERROR]');
      })
    })

    test('1000원으로 나눠지는 구입금액을 입력하면 예외를 반환하지 않는다.', () => {
      const inputs = ['12000', '1000   ', '   4000', ' 5000 '];

      inputs.forEach((input) => {
        function fnBox() {
          new Cash(input);
        }

        expect(fnBox).not.toThrow('[ERROR]');
      })
    })
  })

  describe('getPaidCash', () => {
    test('메서드를 호출하면 지불한 현금이 반환된다.', () => {
      const inputs = ['12000', '1000   ', '   4000', ' 5000 '];
      const outputs = [12000, 1000, 4000, 5000];

      inputs.forEach((input, i) => {
        const cash = new Cash(input);

        expect(cash.getPaidCash()).toBe(outputs[i]);
      })
    })
  })

  describe('getAmountBy', () => {
    test('메서드를 호출하면 가진 현금 만큼 구매 상품 개수가 반환된다.', () => {
      const PRODUCT_PRICE = 1000;
      const inputs = ['12000', '1000   ', '   4000', ' 5000 '];
      const outputs = [12, 1, 4, 5];

      inputs.forEach((input, i) => {
        const cash = new Cash(input);

        expect(cash.getAmountBy(PRODUCT_PRICE)).toBe(outputs[i]);
      })
    })
  })
})
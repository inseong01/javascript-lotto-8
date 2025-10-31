import BonusNumber from "../../src/model/BonusNumber";

const LOTTO = [1, 2, 3, 4, 5, 6];

describe('BonusNumber 클래스 테스트', () => {
  describe('인스턴스 생성', () => {
    test('잘못된 보너스 번호를 입력하면 예외를 반환한다.', () => {
      const inputs = ['123456', '1,2,,4,5,6,7', 'false', '  ,,   ,,,  ', '-1'];

      inputs.forEach((input) => {
        function fnBox() {
          new BonusNumber(input, LOTTO);
        }

        expect(fnBox).toThrow('[ERROR]');
      })
    })

    test('올바른 보너스 번호를 입력하면 예외를 반환하지 않는다.', () => {
      const inputs = ['12', '45   ', '   23'];

      inputs.forEach((input) => {
        function fnBox() {
          new BonusNumber(input, LOTTO);
        }

        expect(fnBox).not.toThrow('[ERROR]');
      })
    })
  })

  describe('getNumber', () => {
    test('메서드를 호출하면 보너스 번호가 반환된다.', () => {
      const inputs = ['10', '   30  ', '45  '];
      const outputs = [10, 30, 45];

      inputs.forEach((input, i) => {
        const myBonusNumber = new BonusNumber(input, LOTTO);

        expect(myBonusNumber.getNumber()).toBe(outputs[i]);
      })
    })
  })

  describe('matches', () => {
    test('메서드를 호출하면 보너스 번호 일치 여부가 반환된다.', () => {
      const MY_LOTTO = [1, 3, 4, 5, 10, 22];

      const inputs = ['10', ' 22 ', '32'];
      const outputs = [true, true, false];

      inputs.forEach((input, i) => {
        const myBonusNumber = new BonusNumber(input, LOTTO);

        expect(myBonusNumber.matches(MY_LOTTO)).toBe(outputs[i]);
      })
    })
  })
})
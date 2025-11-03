import Lotto from "../../src/model/Lotto.js";

describe('Lotto 클래스 테스트', () => {
  describe('인스턴스 생성', () => {
    test("로또 번호의 개수가 6개가 넘어가면 예외가 발생한다.", () => {
      expect(() => {
        new Lotto([1, 2, 3, 4, 5, 6, 7]);
      }).toThrow("[ERROR]");
    });

    // TODO: 테스트가 통과하도록 프로덕션 코드 구현
    test('잘못된 로또 번호를 입력하면 예외를 반환한다.', () => {
      const inputs = [['123456'], ['1,2,,4,5,6,7'], ['false'], ['  ,,   ,,,  '], ['12,34,5,2,6,66']];

      inputs.forEach((input) => {
        function fnBox() {
          new Lotto(input);
        }

        expect(fnBox).toThrow('[ERROR]');
      })
    })

    test('올바른 로또 번호를 입력하면 예외를 반환하지 않는다.', () => {
      const inputs = [[1, 2, 3, 4, 5, 6], ['1', '2', '3', '4', '5', '6']];

      inputs.forEach((input) => {
        function fnBox() {
          new Lotto(input);
        }

        expect(fnBox).not.toThrow('[ERROR]');
      })
    })
  })

  // TODO: 추가 기능 구현에 따른 테스트 코드 작성
  describe('getNumbers', () => {
    test('메서드를 호출하면 로또 번호가 오름차순으로 반환된다.', () => {
      const inputs = [['1', '2', '3', '4', '5', '6'], [1, 3, 5, 4, 6, 2], ['6', '5', '4', '3', '2', '1']];
      const outputs = [1, 2, 3, 4, 5, 6];

      inputs.forEach((input) => {
        const myLotto = new Lotto(input);

        expect(myLotto.getNumbers()).toEqual(outputs);
      })
    })
  })

  describe('countMathNumberOf', () => {
    test('메서드를 호출하면 당첨 로또와 일치한 숫자 개수가 반환된다.', () => {
      const LOTTO = [1, 2, 3, 4, 5, 6];

      const inputs = [['1', '2', '3', '4', '5', '6'], [1, 12, 15, 14, 16, 22], ['6', '5', '4', '23', '24', '12']];
      const outputs = [6, 1, 3];

      inputs.forEach((input, i) => {
        const myLotto = new Lotto(input);

        expect(myLotto.countMathNumberOf(LOTTO)).toEqual(outputs[i]);
      })
    })
  })
})
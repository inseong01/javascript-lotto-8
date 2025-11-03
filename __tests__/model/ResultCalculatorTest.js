import BonusNumber from "../../src/model/BonusNumber.js";
import Cash from "../../src/model/Cash.js";
import Lotto from "../../src/model/Lotto.js";
import ResultCalculator from "../../src/model/ResultCalculator.js";


const LOTTO = new Lotto([1, 2, 3, 4, 5, 6]);
const BONUS_NUMBER = new BonusNumber('32', LOTTO.getNumbers());
const CASH = new Cash('1000');
const MY_LOTTO = [new Lotto([1, 2, 3, 4, 32, 21])]; // 2등 로또

describe('ResultCalculaor 클래스 테스트', () => {
  describe('인스턴스 생성', () => {
    test('내 로또, 당첨번호, 보너스 번호, 현금을 할당하면 예외가 발생하지 않는다.', () => {

      function fnBox() {
        new ResultCalculator(MY_LOTTO, LOTTO, BONUS_NUMBER, CASH);
      }

      expect(fnBox).not.toThrow('[ERROR]');
    })
  })

  describe('getTotalMatch', () => {
    test('메서드를 호출하면 로또 당첨 개수를 반환된다.', () => {
      const output = { first: 0, second: 1, third: 0, forth: 0, fifth: 0 };

      const resultCalculator = new ResultCalculator(MY_LOTTO, LOTTO, BONUS_NUMBER, CASH);

      expect(resultCalculator.getTotalMatch()).toEqual(output);
    })
  })

  describe('getProfitRate', () => {
    test('메서드를 호출하면 당첨 수익률이 반환된다.', () => {
      const output = '3000000.0';

      const resultCalculator = new ResultCalculator(MY_LOTTO, LOTTO, BONUS_NUMBER, CASH);
      resultCalculator.getTotalMatch()

      expect(resultCalculator.getProfitRate()).toBe(output);
    })
  })
})
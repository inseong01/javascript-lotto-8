import LottoMachine from "../../src/model/lottoMachine";

describe('LottoMachine 클래스 테스트', () => {
  describe('generatetLotto', () => {
    test('메서드를 호출하면 개수 만큼 로또를 발행한다.', () => {
      const inputs = [2, 1, 3];
      const outputs = [2, 1, 3];

      inputs.forEach((input, i) => {
        expect(LottoMachine.generatetLotto(input).length).toBe(outputs[i]);
      })
    })
  })

  describe('getBonusNumber', () => {
    test('메서드를 호출하면 입력한 보너스 번호를 발행한다.', () => {
      const LOTTO = [1, 2, 3, 4, 5, 6];

      const inputs = ['22', '11', '33'];
      const outputs = [22, 11, 33];

      inputs.forEach((input, i) => {
        expect(LottoMachine.generateBonusNumber(input, LOTTO).getNumber()).toBe(outputs[i]);
      })
    })
  })
})
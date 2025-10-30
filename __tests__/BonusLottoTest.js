import BonusLotto from "../src/BonusLotto";

describe("보너스 로또 클래스 테스트", () => {
  test("보너스 번호가 없으면 예외가 발생한다.", () => {
    const bonus = undefined;
    const LOTTO = [1, 2, , 3, 4, 5, 6];

    expect(() => {
      new BonusLotto(bonus, LOTTO);
    }).toThrow("[ERROR]");
  });

  test("보너스 번호가 로또 번호와 중복되면 예외가 발생한다.", () => {
    const bonus = '1';
    const LOTTO = ['1', '2', '3', '4', '5', '6'];

    expect(() => {
      new BonusLotto(bonus, LOTTO);
    }).toThrow("[ERROR]");
  });

  test("보너스 번호가 0이면 예외가 발생한다.", () => {
    const bonus = '0';
    const LOTTO = ['1', '2', '3', '4', '5', '6'];

    expect(() => {
      new BonusLotto(bonus, LOTTO);
    }).toThrow("[ERROR]");
  });

  test("보너스 번호가 46이면 예외가 발생한다.", () => {
    const bonus = '46';
    const LOTTO = ['1', '2', '3', '4', '5', '6'];

    expect(() => {
      new BonusLotto(bonus, LOTTO);
    }).toThrow("[ERROR]");
  });

  test("보너스 번호가 정수가 아니면 예외가 발생한다.", () => {
    const bonus = 'false';
    const LOTTO = ['1', '2', '3', '4', '5', '6'];

    expect(() => {
      new BonusLotto(bonus, LOTTO);
    }).toThrow("[ERROR]");
  });

  test("보너스 번호가 음수면 예외가 발생한다.", () => {
    const bonus = '-1';
    const LOTTO = ['1', '2', '3', '4', '5', '6'];

    expect(() => {
      new BonusLotto(bonus, LOTTO);
    }).toThrow("[ERROR]");
  });

  test("당첨 번호, 보너스 번호와 내 번호를 비교하여 2등 여부를 확인한다.", () => {
    const LOTTO = ['1', '2', '3', '4', '5', '6'];
    const MY_LOTTO = ['8', '11', '12', '22', '33', '44'];

    const inputs = [{ bonus: '8' }, { bonus: '9' }];
    const outputs = [true, false];

    inputs.forEach(({ bonus }, i) => {
      const bonusLotto = new BonusLotto(bonus, LOTTO);
      expect(bonusLotto.isMatch(MY_LOTTO)).toBe(outputs[i]);
    })
  })
});

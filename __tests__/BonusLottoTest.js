import BonusLotto from "../src/BonusLotto";

describe("보너스 로또 클래스 테스트", () => {
  test("로또 번호의 개수가 1개가 아니면 예외가 발생한다.", () => {
    expect(() => {
      new BonusLotto([1, 2]);
    }).toThrow("[ERROR]");
  });

  test("당첨 번호와 보너스 번호를 비교하여 2등 여부를 확인한다.", () => {
    const LOTTO = [1, 2, 3, 4, 5, 6];

    const inputs = [{ bonus: 6 }, { bonus: 9 }];
    const outputs = [true, false];

    inputs.forEach(({ bonus }, i) => {
      const myBonusLotto = new BonusLotto([bonus]);
      expect(myBonusLotto.isMatch(LOTTO)).toBe(outputs[i]);
    })
  })
});

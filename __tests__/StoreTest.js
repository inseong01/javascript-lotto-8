import Store from "../src/Store";

describe("매장 클래스 테스트", () => {
  test("구입금액이 숫자가 아니면 예외가 발생한다.", () => {
    expect(() => {
      new Store('false');
    }).toThrow("[ERROR]");
  });

  test("구입금액이 1,000원으로 나눠지지 않으면 예외가 발생한다.", () => {
    expect(() => {
      new Store('1200');
    }).toThrow("[ERROR]");
  });

  test("getLottoAmount, 구입금액에 맞춰 로또 개수를 반환한다.", () => {
    const inputs = ['1000', '2000', '10000'];
    const outputs = [1, 2, 10];

    inputs.forEach((cash, i) => {
      const store = new Store(cash);

      expect(store.getLottoAmount()).toBe(outputs[i]);
    });
  });

  test("getPaidCash, 구입금액을 반환한다.", () => {
    const inputs = ['1000', '2000', '10000'];
    const outputs = [1000, 2000, 10000];

    inputs.forEach((cash, i) => {
      const store = new Store(cash);

      expect(store.getPaidCash()).toBe(outputs[i]);
    });
  });
});

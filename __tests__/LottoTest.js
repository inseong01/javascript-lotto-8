import Lotto from "../src/Lotto";

describe("로또 클래스 테스트", () => {
  test("로또 번호의 개수가 6개가 넘어가면 예외가 발생한다.", () => {
    expect(() => {
      new Lotto([1, 2, 3, 4, 5, 6, 7]);
    }).toThrow("[ERROR]");
  });

  // TODO: 테스트가 통과하도록 프로덕션 코드 구현
  test("로또 번호에 중복된 숫자가 있으면 예외가 발생한다.", () => {
    expect(() => {
      new Lotto([1, 2, 3, 4, 5, 5]);
    }).toThrow("[ERROR]");
  });

  // TODO: 추가 기능 구현에 따른 테스트 코드 작성
  test("당첨 번호와 부여된 번호를 비교하여 일치 개수를 반환한다.", () => {
    const inputs = [[1, 2, 3, 4, 5, 6], [1, 2, 3, 4, 5, 7]];
    const outputs = [6, 5];

    inputs.forEach((input, i) => {
      const myLotto = new Lotto([1, 2, 3, 4, 5, 6])
      expect(myLotto.getMatchCount(input)).toBe(outputs[i]);
    })
  })
});

import { MissionUtils } from "@woowacourse/mission-utils";
import InputView from "../../src/view/InputView";

const mockQuestions = (inputs) => {
  MissionUtils.Console.readLineAsync = jest.fn();

  MissionUtils.Console.readLineAsync.mockImplementation(() => {
    const input = inputs.shift();

    return Promise.resolve(input);
  });
};

describe('InputView 클래스 테스트', () => {
  describe('getLine', () => {
    test('입력한 내용이 반환된다.', async () => {
      const inputs = ['abc'];
      const output = 'abc';

      mockQuestions(inputs);

      expect(await InputView.getLine('')).toBe(output)
    })
  })
})
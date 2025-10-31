import { MissionUtils } from "@woowacourse/mission-utils";
import OutputView from "../../src/view/OutputView";

const getLogSpy = () => {
  const logSpy = jest.spyOn(MissionUtils.Console, "print");
  logSpy.mockClear();
  return logSpy;
};

describe('OutputView 클래스 테스트', () => {
  describe('print', () => {
    test('입력한 내용이 출력된다.', () => {
      const input = 'abc';
      const output = 'abc';

      const logSpy = getLogSpy();

      OutputView.print(input);

      expect(logSpy).toHaveBeenCalledWith(expect.stringContaining(output));
    })
  })
})
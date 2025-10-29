import { MissionUtils } from "@woowacourse/mission-utils";

import getUserInput from "../../src/utility/system";

const mockQuestions = (inputs) => {
  MissionUtils.Console.readLineAsync = jest.fn();

  MissionUtils.Console.readLineAsync.mockImplementation(() => {
    const input = inputs.shift();

    return Promise.resolve(input);
  });
};

const getReadLineSpy = () => {
  const readLineSpy = jest.spyOn(MissionUtils.Console, "readLineAsync");
  readLineSpy.mockClear();
  return readLineSpy;
};

describe('시스템 유틸리티 테스트', () => {
  test('사용자가 입력한 내용을 출력한다.', async () => {
    const input = ['result'];
    const output = ['result'];

    mockQuestions(input);

    const result = await getUserInput('');
    expect(result).toBe(output[0]);
  })
})
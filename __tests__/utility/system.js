import { MissionUtils } from "@woowacourse/mission-utils";

import { getUserInput, print } from "../../src/utility/system";

const mockQuestions = (inputs) => {
  MissionUtils.Console.readLineAsync = jest.fn();

  MissionUtils.Console.readLineAsync.mockImplementation(() => {
    const input = inputs.shift();

    return Promise.resolve(input);
  });
};

const getPrintSpy = () => {
  const readLineSpy = jest.spyOn(MissionUtils.Console, "print");
  readLineSpy.mockClear();
  return readLineSpy;
};

describe('시스템 유틸리티 테스트', () => {
  test('getUserInput, 사용자가 입력한 내용을 출력한다.', async () => {
    const input = ['result'];
    const output = ['result'];

    mockQuestions(input);

    const result = await getUserInput('');
    expect(result).toBe(output[0]);
  })

  test('print, 결과를 출력한다.', () => {
    const input = 'qwe';

    const printSpy = getPrintSpy()

    print(input);

    expect(printSpy).toHaveBeenCalledWith(input)
  })
})
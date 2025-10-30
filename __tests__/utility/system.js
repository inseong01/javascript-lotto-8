import { MissionUtils } from "@woowacourse/mission-utils";

import { getUserInput, print, printLottoNumbers } from "../../src/utility/system";
import Lotto from "../../src/Lotto";

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

  test('printLottoNumbers, 로또 번호를 [] 양식에 맞춰 출력한다.', () => {
    const input = new Lotto(['1', '2', '3', '4', '5', '6']);

    const printSpy = getPrintSpy()

    printLottoNumbers(input);

    const logs = ["[1, 2, 3, 4, 5, 6]"];

    logs.forEach((log) => {
      expect(printSpy).toHaveBeenCalledWith(expect.stringContaining(log));
    });
  })
})
import { MissionUtils } from "@woowacourse/mission-utils";

import App from "../src/App";
import Lotto from "../src/Lotto";
import { MATCH_FIVE, MATCH_FIVE_AND_BONUS, MATCH_FOUR, MATCH_SIX, MATCH_THREE } from "../src/utility/const";

const readLineAsyncMock = jest.fn()

const mockQuestions = (inputs) => {
  MissionUtils.Console.readLineAsync = readLineAsyncMock;

  MissionUtils.Console.readLineAsync.mockImplementation(() => {
    const input = inputs.shift();

    return Promise.resolve(input);
  });
};

const getLogSpy = () => {
  const logSpy = jest.spyOn(MissionUtils.Console, "print");
  logSpy.mockClear();
  return logSpy;
};

describe('App.js 테스트', () => {
  beforeEach(() => {
    readLineAsyncMock.mockReset()
  })

  test('openStore, 잘못된 금액을 입력하면 입력이 다시 호출된다.', async () => {
    mockQuestions(["8020", "1000"])

    const app = new App();
    await app.openStore();

    expect(readLineAsyncMock).toHaveBeenCalledTimes(2);
  })

  test('setWinnerLotto, 잘못된 로또 번호를 입력하면 입력이 다시 호출된다.', async () => {
    mockQuestions(['1,2,3,4,5,1', '11,22,33,21,32,3']);

    const app = new App();
    await app.setWinnerLotto();

    expect(readLineAsyncMock).toHaveBeenCalledTimes(2);
  })

  test('setWinnerBonus, 잘못된 보너스 번호를 입력하면 입력이 다시 호출된다.', async () => {
    const LOTTO = new Lotto(['1', '2', '3', '4', '5', '6']);
    mockQuestions(['1,', '477', '2']);

    const app = new App();
    await app.setWinnerBonus(LOTTO.getNumbers());

    expect(readLineAsyncMock).toHaveBeenCalledTimes(3);
  })

  test('printLottoResult, 로또 결과 형식 만큼 출력이 호출된다.', async () => {
    const INPUT_CASH = '2000';
    const LOTTO_RESULT = {
      [MATCH_THREE]: 0,
      [MATCH_FOUR]: 1,
      [MATCH_FIVE]: 1,
      [MATCH_FIVE_AND_BONUS]: 0,
      [MATCH_SIX]: 0,
    }
    const logs = [
      '당첨 통계',
      '---',
      '3개 일치 (5,000원) - 0개',
      '4개 일치 (50,000원) - 1개',
      '5개 일치 (1,500,000원) - 1개',
      '5개 일치, 보너스 볼 일치 (30,000,000원) - 0개',
      '6개 일치 (2,000,000,000원) - 0개',
      '총 수익률은 77500%입니다.',
    ];


    const logSpy = getLogSpy();

    const app = new App();
    app.printLottoResult(LOTTO_RESULT, INPUT_CASH);


    logs.forEach((log) => {
      expect(logSpy).toHaveBeenCalledWith(expect.stringContaining(log));
    })

    expect(logSpy).toHaveBeenCalledTimes(8);
  })
})
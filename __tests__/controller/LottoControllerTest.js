import { MissionUtils } from "@woowacourse/mission-utils";
import LottoController from "../../src/controller/LottoController"

const readLineAsyncMock = jest.fn();

const mockQuestions = (inputs) => {
  MissionUtils.Console.readLineAsync = readLineAsyncMock;

  MissionUtils.Console.readLineAsync.mockImplementation(() => {
    const input = inputs.shift();

    return Promise.resolve(input);
  });
};

const mockRandoms = (numbers) => {
  MissionUtils.Random.pickUniqueNumbersInRange = jest.fn();
  numbers.reduce((acc, number) => {
    return acc.mockReturnValueOnce(number);
  }, MissionUtils.Random.pickUniqueNumbersInRange);
};

const getLogSpy = () => {
  const logSpy = jest.spyOn(MissionUtils.Console, "print");
  logSpy.mockClear();
  return logSpy;
};

describe('LottoController 클래스 테스트', () => {
  beforeEach(() => {
    readLineAsyncMock.mockReset()
  })

  describe('purchaseLotto', () => {
    test('사용자가 구입금액을 잘못 입력하면 다시 입력받는다.', async () => {
      const WRONG_CASH_INPUT = '1000j';
      const RIGHT_CASH_INPUT = '1000';

      mockQuestions([WRONG_CASH_INPUT, RIGHT_CASH_INPUT]);

      const lottoController = new LottoController()
      await lottoController.purchaseLotto();

      expect(readLineAsyncMock).toHaveBeenCalledTimes(2);
    })

    test('올바른 구입금액을 입력하면 로또 구매 양과 번호가 출력된다.', async () => {
      const logSpy = getLogSpy();

      mockRandoms([
        [8, 21, 23, 41, 42, 43],
        [3, 5, 11, 16, 32, 38],
        [7, 11, 16, 35, 36, 44],
        [1, 8, 11, 31, 41, 42],
        [13, 14, 16, 38, 42, 45],
        [7, 11, 30, 40, 42, 43],
        [2, 13, 22, 32, 38, 45],
        [1, 3, 5, 14, 22, 45],
      ]);
      mockQuestions(["8000"]);

      const lottoController = new LottoController()
      await lottoController.purchaseLotto();

      const logs = [
        "8개를 구매했습니다.",
        "[8, 21, 23, 41, 42, 43]",
        "[3, 5, 11, 16, 32, 38]",
        "[7, 11, 16, 35, 36, 44]",
        "[1, 8, 11, 31, 41, 42]",
        "[13, 14, 16, 38, 42, 45]",
        "[7, 11, 30, 40, 42, 43]",
        "[2, 13, 22, 32, 38, 45]",
        "[1, 3, 5, 14, 22, 45]",
      ];

      logs.forEach((log) => {
        expect(logSpy).toHaveBeenCalledWith(expect.stringContaining(log));
      });
    })
  })

  describe('setJackpotLotto', () => {
    test('사용자가 우승 로또 번호를 잘못 입력하면 다시 입력받는다.', async () => {
      const WRONG_LOTTO_INPUT = '11,22,33,44,55,66,77';
      const RIGHT_LOTTO_INPUT = '1,2,3,4,5,6';

      mockQuestions([WRONG_LOTTO_INPUT, RIGHT_LOTTO_INPUT]);

      const lottoController = new LottoController()
      await lottoController.setJackpotLotto();

      expect(readLineAsyncMock).toHaveBeenCalledTimes(2);
    })
  })

  describe('setBonusNumber', () => {
    test('사용자가 보너스 번호를 잘못 입력하면 다시 입력받는다.', async () => {
      const RIGHT_LOTTO_INPUT = '1,2,3,4,5,6';
      const WRONG_BONUS_INPUT = '11,22,33,44,55,66,77';
      const RIGHT_BONUS_INPUT = '7';

      mockQuestions([RIGHT_LOTTO_INPUT, WRONG_BONUS_INPUT, RIGHT_BONUS_INPUT]);

      const lottoController = new LottoController()
      await lottoController.setJackpotLotto();
      await lottoController.setBonusNumber();

      expect(readLineAsyncMock).toHaveBeenCalledTimes(3);
    })
  })

  describe('showLottoResult', () => {
    const logSpy = getLogSpy();

    beforeEach(async () => {
      const RIGHT_CASH_INPUT = '8000';
      const RIGHT_LOTTO_INPUT = '1,2,3,4,5,6';
      const RIGHT_BONUS_INPUT = '7';

      mockRandoms([
        [8, 21, 23, 41, 42, 43],
        [3, 5, 11, 16, 32, 38],
        [7, 11, 16, 35, 36, 44],
        [1, 8, 11, 31, 41, 42],
        [13, 14, 16, 38, 42, 45],
        [7, 11, 30, 40, 42, 43],
        [2, 13, 22, 32, 38, 45],
        [1, 3, 5, 14, 22, 45],
      ]);
      mockQuestions([RIGHT_CASH_INPUT, RIGHT_LOTTO_INPUT, RIGHT_BONUS_INPUT]);

      const lottoController = new LottoController();
      await lottoController.purchaseLotto();
      await lottoController.setJackpotLotto();
      await lottoController.setBonusNumber();
      lottoController.showLottoResult();
    })

    test('당첨 통계 안내 문구를 출력한다.', () => {
      const logs = [
        '당첨 통계',
        '---',
      ];

      logs.forEach((log) => {
        expect(logSpy).toHaveBeenCalledWith(expect.stringContaining(log));
      })
    })

    test('당첨 집계 문구를 출력한다.', async () => {
      const logs = [
        "3개 일치 (5,000원) - 1개",
        "4개 일치 (50,000원) - 0개",
        "5개 일치 (1,500,000원) - 0개",
        "5개 일치, 보너스 볼 일치 (30,000,000원) - 0개",
        "6개 일치 (2,000,000,000원) - 0개",
      ];

      logs.forEach((log) => {
        expect(logSpy).toHaveBeenCalledWith(expect.stringContaining(log));
      })
    })

    test('로또 수익률 문구를 출력한다.', async () => {
      const logs = [
        "총 수익률은 62.5%입니다.",
      ];

      logs.forEach((log) => {
        expect(logSpy).toHaveBeenCalledWith(expect.stringContaining(log));
      })
    })
  })
})
import { MissionUtils } from "@woowacourse/mission-utils";

import App from "../src/App";
import Lotto from "../src/Lotto";

const readLineAsyncMock = jest.fn()

const mockQuestions = (inputs) => {
  MissionUtils.Console.readLineAsync = readLineAsyncMock;

  MissionUtils.Console.readLineAsync.mockImplementation(() => {
    const input = inputs.shift();

    return Promise.resolve(input);
  });
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
})
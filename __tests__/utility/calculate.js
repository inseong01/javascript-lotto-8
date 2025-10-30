import BonusLotto from "../../src/BonusLotto";
import Lotto from "../../src/Lotto";
import { calculateProfitRate, getLottoResult } from "../../src/utility/calculate";

describe('계산 유틸리티 테스트', () => {
  test('calculateProfitRate, 로또 당첨 결과를 받으면 수익률을 반환한다.', async () => {
    const CASH = 3000;
    const lottoResult = {
      '3개': 0,
      '4개': 0,
      '5개': 1,
      '5개 일치, 보너스볼': 0,
      '6개': 1,
    }
    const output = 667165.7

    const profit = calculateProfitRate(lottoResult, CASH);
    expect(profit).toBe(output);
  })

  test('getLottoResult, 당첨번호와 나의 로또 번호를 대조해 로또 결과를 반환한다.', async () => {
    const LOTTO = new Lotto(['1', '2', '3', '4', '5', '6']);
    const BONUS = new BonusLotto('7', LOTTO.getNumbers());
    const MY_LOTTOS = [new Lotto(['1', '2', '3', '4', '8', '10']), new Lotto(['11', '12', '21', '22', '33', '44'])]

    const output = {
      '3개': 0,
      '4개': 1,
      '5개': 0,
      '5개 일치, 보너스볼': 0,
      '6개': 0,
    }

    const result = getLottoResult(LOTTO, BONUS, MY_LOTTOS);
    expect(result).toEqual(output);
  })
})
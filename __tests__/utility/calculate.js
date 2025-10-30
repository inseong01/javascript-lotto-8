import Lotto from "../../src/Lotto";
import BonusLotto from "../../src/BonusLotto";
import { calculateProfitRate, getLottoResult } from "../../src/utility/calculate";
import { MATCH_FIVE, MATCH_FIVE_AND_BONUS, MATCH_FOUR, MATCH_SIX, MATCH_THREE } from "../../src/utility/const";

describe('계산 유틸리티 테스트', () => {
  test('calculateProfitRate, 로또 당첨 결과를 받으면 수익률을 반환한다.', async () => {
    const CASH = 8000;
    const lottoResult = {
      [MATCH_THREE]: 1,
      [MATCH_FOUR]: 0,
      [MATCH_FIVE]: 0,
      [MATCH_FIVE_AND_BONUS]: 0,
      [MATCH_SIX]: 0,
    }
    const output = 62.5;

    const profit = calculateProfitRate(lottoResult, CASH);
    expect(profit).toBe(output);
  })

  test('getLottoResult, 당첨번호와 나의 로또 번호를 대조해 로또 결과를 반환한다.', async () => {
    const LOTTO_NUMBERS = [1, 2, 3, 4, 5, 6];
    const BONUS = new BonusLotto('7', LOTTO_NUMBERS);
    const MY_LOTTOS = [new Lotto(['1', '2', '3', '4', '8', '10']), new Lotto(['11', '12', '21', '22', '33', '44'])]

    const output = {
      [MATCH_THREE]: 0,
      [MATCH_FOUR]: 1,
      [MATCH_FIVE]: 0,
      [MATCH_FIVE_AND_BONUS]: 0,
      [MATCH_SIX]: 0,
    }

    const result = getLottoResult(LOTTO_NUMBERS, BONUS, MY_LOTTOS);
    expect(result).toEqual(output);
  })
})
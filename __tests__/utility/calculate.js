import calculateProfitRate from "../../src/utility/calculate";

describe('계산 유틸리티 테스트', () => {
  test('calculateProfitRate, 로또 당첨 결과를 받으면 수익률을 반환한다.', async () => {
    const CASH = 3000;
    const lottoResult = {
      matchCount3: 0,
      matchCount4: 0,
      matchCount5: 1,
      matchCount5AndBonus: 0,
      matchCount6: 1,
    }
    const output = 667165.7

    const profit = calculateProfitRate(lottoResult, CASH);
    expect(profit).toBe(output);
  })
})
const lottoPrice = {
  matchCount3: 5000,
  matchCount4: 50000,
  matchCount5: 1500000,
  matchCount5AndBonus: 30000000,
  matchCount6: 2000000000,
};

/**
 * 로또 결과에 맞춰 수익률을 반환한다.
 * @param {object} lottoResult 로또 결과 개수 보관 객체
 * @param {number} cash 구입금액
 * @returns 수익률
 */
export default function calculateProfitRate(lottoResult, cash) {
  const resultArr = Object.entries(lottoResult);
  const totalProfit = resultArr.reduce((acc, [key, value]) => (
    acc + (lottoPrice[key] * value)
  ), 0);

  const profitRate = ((totalProfit - cash) / cash).toFixed(1);
  return Number(profitRate);
}

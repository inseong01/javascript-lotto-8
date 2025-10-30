export const lottoPrice = {
  '3개': 5000,
  '4개': 50000,
  '5개': 1500000,
  '5개 일치, 보너스볼': 30000000,
  '6개': 2000000000,
};

/**
 * 로또 결과에 맞춰 수익률을 반환한다.
 * @param {object} lottoResult 로또 결과 개수 보관 객체
 * @param {number} cash 구입금액
 * @returns 수익률
 */
export function calculateProfitRate(lottoResult, cash) {
  const resultArr = Object.entries(lottoResult);
  const totalProfit = resultArr.reduce((acc, [key, value]) => (
    acc + (lottoPrice[key] * value)
  ), 0);

  const profitRate = ((totalProfit - cash) / cash).toFixed(1);
  return Number(profitRate);
}

/**
 * 당첨번호와 내 로또와 대조해 로또 일치 결과를 반환한다.
 * @param {number[]} winnerNumbers 당첨로또 번호
 * @param {BonusLotto} bonus 보너스로또
 * @param {Lotto[]} myLottos 내 로또
 */
export function getLottoResult(winnerNumbers, bonus, myLottos) {
  const result = {
    '3개': 0,
    '4개': 0,
    '5개': 0,
    '5개 일치, 보너스볼': 0,
    '6개': 0,
  };

  myLottos.forEach((lotto) => {
    const myNumbers = lotto.getNumbers();

    // 번호 비교
    const matchCounts = myNumbers.reduce((acc, num) => {
      if (winnerNumbers.includes(num)) return acc + 1;
      return acc;
    }, 0);

    if (matchCounts === 6) {
      result['6개'] += 1;
    } else if (matchCounts === 5) {
      const isMatched = bonus.isMatch(myNumbers);
      if (!isMatched) result['5개'] += 1;
      else result['5개 일치, 보너스볼'] += 1;
    } else if (matchCounts === 4) {
      result['4개'] += 1;
    } else if (matchCounts === 3) {
      result['3개'] += 1;
    }
  });

  // 결과 반환
  return result;
}

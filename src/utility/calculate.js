import {
  LOTTOT_PRICE, MATCH_THREE, MATCH_FOUR, MATCH_FIVE, MATCH_FIVE_AND_BONUS, MATCH_SIX,
} from './const.js';

/**
 * 로또 결과에 맞춰 수익률을 반환한다.
 * @param {object} lottoResult 로또 결과 개수 보관 객체
 * @param {number} cash 구입금액
 * @returns 수익률
 */
export function calculateProfitRate(lottoResult, cash) {
  const resultArr = Object.entries(lottoResult);
  const totalProfit = resultArr.reduce((acc, [match, amount]) => (
    acc + (LOTTOT_PRICE[match] * amount)
  ), 0);

  const profitRate = ((totalProfit / cash) * 100).toFixed(1);
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
    [MATCH_THREE]: 0,
    [MATCH_FOUR]: 0,
    [MATCH_FIVE]: 0,
    [MATCH_FIVE_AND_BONUS]: 0,
    [MATCH_SIX]: 0,
  };

  myLottos.forEach((lotto) => {
    const myNumbers = lotto.getNumbers();

    // 번호 비교
    const matchCounts = myNumbers.reduce((acc, num) => {
      if (winnerNumbers.includes(num)) return acc + 1;
      return acc;
    }, 0);

    if (matchCounts === 6) {
      result[MATCH_SIX] += 1;
    } else if (matchCounts === 5) {
      const isMatched = bonus.isMatch(myNumbers);
      if (!isMatched) result[MATCH_FIVE] += 1;
      else result[MATCH_FIVE_AND_BONUS] += 1;
    } else if (matchCounts === 4) {
      result[MATCH_FOUR] += 1;
    } else if (matchCounts === 3) {
      result[MATCH_THREE] += 1;
    }
  });

  // 결과 반환
  return result;
}

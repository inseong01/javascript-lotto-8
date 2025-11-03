import { LOTTO_RANK, PRIZE } from './const/LottoGame.js';

/**
 * 로또 집계 결과로 상금 합계를 구한다.
 * @param {number} acc 합계
 */
export function calculatePrize(acc, [rank, amount]) {
  if (amount === 0) return acc;

  switch (rank) {
    case LOTTO_RANK.FIRST: return acc + (amount * PRIZE.FIRST_RANK);
    case LOTTO_RANK.SECOND: return acc + (amount * PRIZE.SECOND_RANK);
    case LOTTO_RANK.THIRD: return acc + (amount * PRIZE.THIRD_RANK);
    case LOTTO_RANK.FORTH: return acc + (amount * PRIZE.FORTH_RANK);
    case LOTTO_RANK.FIFTH: return acc + (amount * PRIZE.FIFTH_RANK);
    default: return acc;
  }
}

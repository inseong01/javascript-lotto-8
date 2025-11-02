import { MissionUtils } from '@woowacourse/mission-utils';

import { LOTTO_NUMBER_AMOUNT, MAX_RANGE, MIN_RANGE } from './const/LottoGame.js';

/**
 * 1-MAX_RANGE 사이의 무작위 수로 구성된 숫자 6자리를 생성한다.
 * @returns 숫자 6자리 배열
 */
export function generateNumbers() {
  const numbers = MissionUtils.Random.pickUniqueNumbersInRange(
    MIN_RANGE,
    MAX_RANGE,
    LOTTO_NUMBER_AMOUNT,
  );
  return numbers;
}

/**
 * 숫자 배열을 오름차순으로 정렬한다.
 * @param {number[]} numbers 로또 숫자 배열
 * @returns 오름차순 숫자 배열
 */
export function sortNumbersAsc(numbers) {
  const sortedArr = numbers.sort((a, b) => a - b);
  return sortedArr;
}

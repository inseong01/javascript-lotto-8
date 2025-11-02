import { MissionUtils } from '@woowacourse/mission-utils';

import Lotto from '../Lotto.js';
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

/**
 * 문자 배열을 숫자 배열로 반환한다.
 * @param {string[]} strings 문자 숫자 배열
 * @returns 오름차순 숫자 배열
 */
export function transformToNumber(strings) {
  const numbers = strings.map(Number);
  return numbers;
}

/**
 * 장 수 만큼 로또를 발급한다.
 * @param {number} amount 로또 장 수
 * @returns {Lotto[]}
 */
export function generateLottos(amount) {
  const generateRepititions = Array(amount).fill(0);

  const lottos = generateRepititions.map(() => {
    const numbers = generateNumbers();
    const ascNumArr = sortNumbersAsc(numbers);
    return new Lotto(ascNumArr);
  });

  return lottos;
}

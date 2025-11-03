import { MissionUtils } from '@woowacourse/mission-utils';

import { LOTTO_NUMBER_AMOUNT, MAX_RANGE, MIN_RANGE } from './const/lottoGame.js';

/**
 * MIN_RANGE-MAX_RANGE 사이의 무작위 수로 구성된 숫자 LOTTO_NUMBER_AMOUNT 만큼 생성한다.
 * @returns 숫자 LOTTO_NUMBER_AMOUNT 자리 배열
 */
export function generateNumbers() {
  const numbers = MissionUtils.Random.pickUniqueNumbersInRange(
    MIN_RANGE,
    MAX_RANGE,
    LOTTO_NUMBER_AMOUNT,
  );
  return numbers;
}

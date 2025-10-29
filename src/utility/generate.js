import { MissionUtils } from '@woowacourse/mission-utils';

/**
 * 1-45 사이의 무작위 수로 구성된 숫자 6자리를 생성한다.
 * @returns 숫자 6자리 배열
 */
export function generateNumber() {
  const numbers = MissionUtils.Random.pickUniqueNumbersInRange(1, 45, 6);
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

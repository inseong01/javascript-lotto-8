import { MissionUtils } from '@woowacourse/mission-utils';

/**
 * 입력을 안내하고 입력 받은 값을 반환한다.
 * @param {string} prompt 시스템 안내 프롬프트
 * @returns 입력 값
 */
export async function getUserInput(prompt) {
  const input = await MissionUtils.Console.readLineAsync(prompt);
  return input;
}

/**
 * 인자를 출력한다.
 * @param {string} result 출력 결과
 */
export function print(result) {
  MissionUtils.Console.print(result);
}

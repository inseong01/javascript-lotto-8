import { MissionUtils } from "@woowacourse/mission-utils";

import { generateLottoNums, generateNumber, sortNumbersAsc } from "../../src/utility/generate";

const mockRandoms = (numbers) => {
  MissionUtils.Random.pickUniqueNumbersInRange = jest.fn();
  numbers.reduce((acc, number) => {
    return acc.mockReturnValueOnce(number);
  }, MissionUtils.Random.pickUniqueNumbersInRange);
};

describe('생성 유틸리티 테스트', () => {
  test('generateNumbers, 1-45 사이 무작위 숫자 6자리 배열을 반환한다.', async () => {
    const result = generateNumber();
    expect(new Set(result).size === 6).toBe(true);
  })

  test('sortNumbersAsc, 오름차순으로 정렬된 숫자 배열을 반환한다.', async () => {
    const input = [10, 3, 5, 2, 6, 1];
    const output = [1, 2, 3, 5, 6, 10];

    const result = sortNumbersAsc(input)
    expect(result).toEqual(output);
  })
})
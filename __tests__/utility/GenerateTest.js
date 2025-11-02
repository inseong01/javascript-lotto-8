import { LOTTO_NUMBER_AMOUNT, MAX_RANGE, MIN_RANGE } from "../../src/utility/const/LottoGame";
import { generateNumbers } from "../../src/utility/Generate";

describe('generateNumbers 유틸리티 테스트', () => {
  test(`${MIN_RANGE}-${MAX_RANGE} 사이 무작위 숫자 ${LOTTO_NUMBER_AMOUNT}자리 배열을 반환한다.`, async () => {
    const result = generateNumbers();

    expect(new Set(result).size === 6).toBe(true);
  })
})
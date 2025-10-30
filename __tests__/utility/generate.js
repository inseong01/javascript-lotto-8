import { generateLottos, generateNumbers, sortNumbersAsc, transformToNumber } from "../../src/utility/generate";

describe('생성 유틸리티 테스트', () => {
  test('generateNumbers, 1-45 사이 무작위 숫자 6자리 배열을 반환한다.', async () => {
    const result = generateNumbers();

    expect(new Set(result).size === 6).toBe(true);
  })

  test('sortNumbersAsc, 오름차순으로 정렬된 숫자 배열을 반환한다.', async () => {
    const input = [10, 3, 5, 2, 6, 1];
    const output = [1, 2, 3, 5, 6, 10];

    const result = sortNumbersAsc(input)
    expect(result).toEqual(output);
  })

  test('transformToNumber, 글자형을 숫자형으로 반환한다.', async () => {
    const input = ['10', '3', '5', '2', '6', '1'];
    const output = [10, 3, 5, 2, 6, 1];

    const result = transformToNumber(input)
    expect(result).toEqual(output);
  })

  test('generateLottos, 횟수 만큼 로또를 발급한다.', async () => {
    const inputs = [10, 3, 5, 2, 6, 1];
    const outputs = [10, 3, 5, 2, 6, 1];

    inputs.forEach((input, i) => {
      const result = generateLottos(input)
      expect(result.length).toEqual(outputs[i]);
    })
  })
})
import { sortAsc } from "../../src/utility/SortAsc";

describe('sortAsc 유틸리티 테스트', () => {
  test('오름차순으로 정렬된 숫자 배열을 반환한다.', async () => {
    const inputs = [[10, 3, 5, 2, 6, 1], ['3', '1', '6', '2', '10', '5']];
    const output = [1, 2, 3, 5, 6, 10];

    inputs.forEach((input) => {
      const result = sortAsc(input)
      expect(result).toEqual(output);
    })
  })
})
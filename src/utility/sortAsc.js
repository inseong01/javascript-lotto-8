/**
 * 숫자 배열을 오름차순으로 정렬한다.
 * @param {number[] | string[]} arr 로또 숫자 배열
 * @returns 오름차순 숫자 배열
 */
export function sortAsc(arr) {
  const numbers = arr.map(Number);
  const sortedArr = numbers.sort((a, b) => a - b);
  return sortedArr;
}

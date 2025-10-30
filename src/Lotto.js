import { transformToNumber } from './utility/generate.js';

class Lotto {
  #numbers;

  constructor(numbers) {
    this.#validate(numbers);
    this.#numbers = transformToNumber(numbers);
  }

  #validate(numbers) {
    if (numbers.length !== 6) {
      throw new Error('[ERROR] 로또 번호는 6개여야 합니다.');
    }

    if (new Set(numbers).size !== numbers.length) {
      throw new Error('[ERROR] 로또 번호는 중복되어서는 안 됩니다.');
    }
  }

  /**
   * 로또 클래스의 번호를 반환한다.
   * @returns 로또 번호
   */
  getNumbers() {
    return this.#numbers;
  }
}

export default Lotto;

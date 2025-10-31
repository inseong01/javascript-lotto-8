import Validator from '../utility/validate.js';

class Lotto {
  #numbers;

  constructor(numbers) {
    this.#validate(numbers);
    // TODO: 유틸리티 함수로 분리
    this.#numbers = numbers.sort((a, b) => a - b);
  }

  #validate(numbers) {
    Validator.validateLotto(numbers);
  }

  getNumbers() {
    return this.#numbers;
  }

  countMathNumberOf(jackpotNumbers) {
    const count = this.#numbers.reduce((acc, num) => {
      if (jackpotNumbers.includes(num)) return acc + 1;
      return acc;
    }, 0);

    return count;
  }
}

export default Lotto;

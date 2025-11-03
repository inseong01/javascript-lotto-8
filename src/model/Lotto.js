import { sortAsc } from '../utility/sortAsc.js';
import Validator from '../utility/validator.js';

class Lotto {
  #numbers;

  constructor(numbers) {
    this.#validate(numbers);
    this.#numbers = sortAsc(numbers);
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

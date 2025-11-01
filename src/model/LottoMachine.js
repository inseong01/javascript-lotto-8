import { generateNumbers, sortNumbersAsc } from '../utility/generate.js';
import BonusNumber from './BonusNumber.js';
import Lotto from './Lotto.js';

class LottoMachine {
  static generatetLotto(amount) {
    const repetitions = Array(amount).fill(0);

    const lottos = repetitions.map(() => {
      const numbers = generateNumbers();
      const ascNumbers = sortNumbersAsc(numbers);
      return new Lotto(ascNumbers);
    });

    return lottos;
  }

  static generateBonusNumber(input, jackpotNumbers) {
    return new BonusNumber(input, jackpotNumbers);
  }

  static getjackpotLotto(input) {
    const numbers = input.split(',').map((num) => num.trim());
    return new Lotto(numbers);
  }
}

export default LottoMachine;

import { calculatePrize } from '../utility/calculatePrize.js';

class ResultCalculator {
  #myLottos;

  #jackpotLotto;

  #bonusNumber;

  #cash;

  #result;

  constructor(myLottos, jackpotLotto, bonusNumber, cash) {
    this.#myLottos = myLottos;
    this.#jackpotLotto = jackpotLotto;
    this.#bonusNumber = bonusNumber;
    this.#cash = cash;
  }

  getTotalMatch() {
    const result = {
      fifth: 0,
      forth: 0,
      third: 0,
      second: 0,
      first: 0,
    };

    const myLottos = this.#myLottos;
    const jackpotLotto = this.#jackpotLotto.getNumbers();

    myLottos.forEach((myLotto) => {
      const numbers = myLotto.getNumbers();

      const matchNumberCount = numbers.reduce((acc, num) => {
        if (jackpotLotto.includes(num)) return acc + 1;
        return acc;
      }, 0);

      if (matchNumberCount === 6) {
        result.first += 1;
        return;
      }

      const bonus = this.#bonusNumber;
      if (matchNumberCount === 4 && bonus.matches(numbers)) {
        result.second += 1;
        return;
      }

      if (matchNumberCount === 4) {
        result.forth += 1;
        return;
      }

      if (matchNumberCount === 5) {
        result.third += 1;
        return;
      }

      if (matchNumberCount === 3) {
        result.fifth += 1;
      }
    });

    this.#result = result;

    return result;
  }

  getProfitRate() {
    const result = this.#result;
    const totalProfit = Object.entries(result).reduce(calculatePrize, 0);

    const cash = this.#cash.getPaidCash();
    const profitRate = ((totalProfit / cash) * 100).toFixed(1);

    return profitRate;
  }
}

export default ResultCalculator;

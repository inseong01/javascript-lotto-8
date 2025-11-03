import { calculatePrize } from '../utility/CalculatePrize.js';
import { INIT_MATCH_LOTTO_RESULT } from '../utility/const/LottoGame.js';

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
    const myLottos = this.#myLottos;

    const result = myLottos.reduce((res, myLotto) => (
      this.#calculateLottoResult(res, myLotto)
    ), INIT_MATCH_LOTTO_RESULT);

    this.#result = result;

    return result;
  }

  #calculateLottoResult(res, myLotto) {
    const myNumbers = myLotto.getNumbers();
    const jackpotLotto = this.#jackpotLotto.getNumbers();

    const matchNumberCount = myNumbers.reduce((acc, num) => (
      this.#calculateMatchNumberCount(acc, num, jackpotLotto)
    ), 0);

    return this.#calculateMatchLottoAmount(matchNumberCount, res, myNumbers);
  }

  #calculateMatchNumberCount(acc, num, jackpotLotto) {
    if (jackpotLotto.includes(num)) return acc + 1;
    return acc;
  }

  #calculateMatchLottoAmount(matchNumberCount, res, myNumbers) {
    if (matchNumberCount === 6) {
      const first = res.first + 1;
      return { ...res, first };
    }

    const bonus = this.#bonusNumber;
    if (matchNumberCount === 4 && bonus.matches(myNumbers)) {
      const second = res.second + 1;
      return { ...res, second };
    }

    if (matchNumberCount === 4) {
      const forth = res.forth + 1;
      return { ...res, forth };
    }

    if (matchNumberCount === 5) {
      const third = res.third + 1;
      return { ...res, third };
    }

    if (matchNumberCount === 3) {
      const fifth = res.fifth + 1;
      return { ...res, fifth };
    }

    return { ...res };
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

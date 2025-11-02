import { LOTTO_RANK, PRIZE } from '../utility/const/LottoGame.js';

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
      first: 0,
      second: 0,
      third: 0,
      forth: 0,
      fifth: 0,
    };

    const jackpotLotto = this.#jackpotLotto.getNumbers();

    this.#myLottos.forEach((myLotto) => {
      const numbers = myLotto.getNumbers();

      const matchCount = numbers.reduce((acc, num) => {
        if (jackpotLotto.includes(num)) return acc + 1;
        return acc;
      }, 0);

      switch (matchCount) {
        case 6: {
          result.first += 1;
          break;
        }
        case 5: {
          result.third += 1;
          break;
        }
        case 4: {
          const bonus = this.#bonusNumber;
          if (bonus.matches(numbers)) {
            result.second += 1;
            break;
          }

          result.forth += 1;
          break;
        }
        case 3: {
          result.fifth += 1;
          break;
        }
        default: break;
      }
    });

    this.#result = result;

    return result;
  }

  getProfitRate() {
    const result = this.#result;
    const totalProfit = Object.entries(result).reduce((acc, [rank, amount]) => {
      if (amount === 0) return acc;

      switch (rank) {
        case LOTTO_RANK.FIRST: {
          return acc + (amount * PRIZE.FIRST_RANK);
        }
        case LOTTO_RANK.SECOND: {
          return acc + (amount * PRIZE.SECOND_RANK);
        }
        case LOTTO_RANK.THIRD: {
          return acc + (amount * PRIZE.THIRD_RANK);
        }
        case LOTTO_RANK.FORTH: {
          return acc + (amount * PRIZE.FORTH_RANK);
        }
        case LOTTO_RANK.FIFTH: {
          return acc + (amount * PRIZE.FIFTH_RANK);
        }
        default: return acc;
      }
    }, 0);

    const cash = this.#cash.getPaidCash();
    const profitRate = ((totalProfit / cash) * 100).toFixed(1);

    return Number(profitRate);
  }
}

export default ResultCalculator;

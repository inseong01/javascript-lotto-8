import Cash from '../model/Cash.js';
import LottoMachine from '../model/LottoMachine.js';
import ResultCalculator from '../model/ResultCalculator.js';

import InputView from '../view/InputView.js';
import OutputView from '../view/OutputView.js';

import getMatchPrompt from '../utility/GetPrompt.js';
import { PROMPT } from '../utility/const/Prompt.js';
import { LOTTO_PURCHASE_PRICE } from '../utility/const/LottoGame.js';

class LottoController {
  #cash;

  #myLottos;

  #jackpotLotto;

  #bonus;

  constructor() {
    this.inputView = InputView;
    this.outputView = OutputView;
  }

  async purchaseLotto() {
    const cashInput = await this.inputView.getLine(PROMPT.PUSRCHASE_LOTTO);

    try {
      this.#cash = new Cash(cashInput);
    } catch (err) {
      this.outputView.print(err.message);
      await this.purchaseLotto();
    }
  }

  showPurchasedLottos() {
    const lottoAmount = this.#cash.getAmountBy(LOTTO_PURCHASE_PRICE);
    this.outputView.print(`\n${lottoAmount}개를 구매했습니다.`);

    this.#myLottos = LottoMachine.generatetLotto(lottoAmount);
    this.#myLottos.forEach((lotto) => {
      const numbers = lotto.getNumbers();
      const numbersFormat = numbers.join(', ');
      this.outputView.print(`[${numbersFormat}]`);
    });
  }

  async setJackpotLotto() {
    const lottoInput = await this.inputView.getLine(PROMPT.ENTER_LOTTO_NUMBERS);

    try {
      this.#jackpotLotto = LottoMachine.getjackpotLotto(lottoInput);
    } catch (err) {
      this.outputView.print(err.message);
      await this.setJackpotLotto();
    }
  }

  async setBonusNumber() {
    const bonusNumberInput = await this.inputView.getLine(PROMPT.ENTER_BONUS_NUMBER);

    const jackpotNumbers = this.#jackpotLotto.getNumbers();
    try {
      this.#bonus = LottoMachine.generateBonusNumber(bonusNumberInput, jackpotNumbers);
    } catch (err) {
      this.outputView.print(err.message);
      await this.setBonusNumber();
    }
  }

  showLottoResult() {
    this.outputView.print(PROMPT.RESULT);
    this.outputView.print('---');

    // 집계
    const resultCalculator = new ResultCalculator(
      this.#myLottos,
      this.#jackpotLotto,
      this.#bonus,
      this.#cash,
    );
    const matchResult = resultCalculator.getTotalMatch();

    Object.entries(matchResult).forEach(([rank, amount]) => {
      const matchPropmt = getMatchPrompt(rank);
      this.outputView.print(`${matchPropmt} - ${amount}개`);
    });

    // 수익률
    const profitRate = resultCalculator.getProfitRate();
    this.outputView.print(`총 수익률은 ${profitRate}%입니다.`);
  }
}

export default LottoController;

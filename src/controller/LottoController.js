import Cash from '../model/Cash.js';
import LottoMachine from '../model/LottoMachine.js';
import ResultCalculator from '../model/ResultCalculator.js';

import InputView from '../view/InputView.js';
import OutputView from '../view/OutputView.js';

import getMatchPrompt from '../utility/getPrompt.js';

const LOTTO_PRICE = 1000;
const PROMPT = {
  purchaseLotto: '구입금액을 입력해 주세요.\n',
  enterLottoNumbers: '\n당첨 번호를 입력해 주세요.\n',
  enterBonusNumber: '\n보너스 번호를 입력해 주세요.\n',
  result: '\n당첨 통계',
};

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
    const cashInput = await this.inputView.getLine(PROMPT.purchaseLotto);

    try {
      this.#cash = new Cash(cashInput);
    } catch (err) {
      this.outputView.print(err.message);
      await this.purchaseLotto();
    }
  }

  showPurchasedLottos() {
    const lottoAmount = this.#cash.getAmountBy(LOTTO_PRICE);
    this.outputView.print(`\n${lottoAmount}개를 구매했습니다.`);

    this.#myLottos = LottoMachine.generatetLotto(lottoAmount);
    this.#myLottos.forEach((lotto) => {
      const numbers = lotto.getNumbers();
      const numbersFormat = numbers.join(', ');
      this.outputView.print(`[${numbersFormat}]`);
    });
  }

  async setJackpotLotto() {
    const lottoInput = await this.inputView.getLine(PROMPT.enterLottoNumbers);

    try {
      this.#jackpotLotto = LottoMachine.getjackpotLotto(lottoInput);
    } catch (err) {
      this.outputView.print(err.message);
      await this.setJackpotLotto();
    }
  }

  async setBonusNumber() {
    const bonusNumberInput = await this.inputView.getLine(PROMPT.enterBonusNumber);

    const jackpotNumbers = this.#jackpotLotto.getNumbers();
    try {
      this.#bonus = LottoMachine.generateBonusNumber(bonusNumberInput, jackpotNumbers);
    } catch (err) {
      this.outputView.print(err.message);
      await this.setBonusNumber();
    }
  }

  showLottoResult() {
    this.outputView.print(PROMPT.result);
    this.outputView.print('---');

    // 집계
    const resultCalculator = new ResultCalculator(
      this.#myLottos,
      this.#jackpotLotto,
      this.#bonus,
      this.#cash,
    );
    const matchResult = resultCalculator.getTotalMatch();

    Object.entries(matchResult).forEach(([match, count]) => {
      const matchPropmt = getMatchPrompt(match);
      this.outputView.print(`${matchPropmt} - ${count}개`);
    });

    // 수익률
    const profitRate = resultCalculator.getProfitRate();
    this.outputView.print(`총 수익률은 ${profitRate}%입니다.`);
  }
}

export default LottoController;

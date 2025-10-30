import { getUserInput, print, printLottoNumbers } from './utility/system.js';
import { calculateProfitRate, getLottoResult } from './utility/calculate.js';
import { generateLottos } from './utility/generate.js';
import { LOTTOT_PRICE } from './utility/const.js';
import Store from './Store.js';
import Lotto from './Lotto.js';
import BonusLotto from './BonusLotto.js';

class App {
  #purchasePrompt;

  #enterLottoNumbersPrompt;

  #enterBonusNumberPrompt;

  #resultPrompt;

  #store;

  #winnerLotto;

  #winnerBonus;

  constructor() {
    this.#purchasePrompt = '구입금액을 입력해 주세요.\n';
    this.#enterLottoNumbersPrompt = '\n당첨 번호를 입력해 주세요.\n';
    this.#enterBonusNumberPrompt = '\n보너스 번호를 입력해 주세요.\n';
    this.#resultPrompt = '\n당첨 통계';
  }

  async run() {
    await this.openStore();

    const myLottoAmount = this.#store.getLottoAmount();
    print(`\n${myLottoAmount}개를 구매했습니다.`);

    const myLottos = generateLottos(myLottoAmount);
    myLottos.forEach(printLottoNumbers);

    await this.setWinnerLotto();

    const winnerNumbers = this.#winnerLotto.getNumbers();
    await this.setWinnerBonus(winnerNumbers);

    const bonusLotto = this.#winnerBonus;
    const myLottoResult = getLottoResult(winnerNumbers, bonusLotto, myLottos);
    const cash = this.#store.getPaidCash();
    this.printLottoResult(myLottoResult, cash);
  }

  async openStore() {
    /* 구입금액 입력 */
    const cash = await getUserInput(this.#purchasePrompt);

    try {
      this.#store = new Store(cash);
    } catch (error) {
      print(`${error.message}\n`);
      await this.openStore();
    }
  }

  async setWinnerLotto() {
    /* 로또 입력 */
    const lottoNumberInput = await getUserInput(this.#enterLottoNumbersPrompt);
    const splitedNumbers = lottoNumberInput.split(',');

    try {
      this.#winnerLotto = new Lotto(splitedNumbers);
    } catch (error) {
      print(`${error.message}\n`);
      await this.setWinnerLotto();
    }
  }

  async setWinnerBonus(winnerLotto) {
    /* 보너스 번호 입력 */
    const bonusNumberInput = await getUserInput(this.#enterBonusNumberPrompt);

    try {
      this.#winnerBonus = new BonusLotto(bonusNumberInput, winnerLotto);
    } catch (error) {
      print(error.message);
      await this.setWinnerBonus();
    }
  }

  printLottoResult(result, cash) {
    print(this.#resultPrompt);
    print('---');

    Object.entries(LOTTOT_PRICE).forEach(([match, price]) => {
      const amount = result[match];

      print(`${match} 일치 (${price.toLocaleString()}원) - ${amount}개`);
    });

    const profitRate = calculateProfitRate(result, cash);
    print(`총 수익률은 ${profitRate}%입니다.`);
  }
}

export default App;

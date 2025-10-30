import { getUserInput, print } from './utility/system.js';
import { generateNumbers, sortNumbersAsc } from './utility/generate.js';
import { calculateProfitRate, getLottoResult } from './utility/calculate.js';
import { LOTTOT_PRICE } from './utility/const.js';
import Store from './Store.js';
import Lotto from './Lotto.js';
import BonusLotto from './BonusLotto.js';

class App {
  #purchasePrompt;

  #enterLottoNumbersPrompt;

  #enterBonusNumberPrompt;

  #store;

  #winnerLotto;

  #winnerBonus;

  constructor() {
    this.#purchasePrompt = '구입금액을 입력해 주세요.\n';
    this.#enterLottoNumbersPrompt = '\n당첨 번호를 입력해 주세요.\n';
    this.#enterBonusNumberPrompt = '\n보너스 번호를 입력해 주세요.\n';
  }

  async run() {
    /* 첫 번째 입력 */
    await this.openStore();

    /* 로또 개수 출력 */
    const myLottoAmount = this.#store.getLottoAmount();
    print(`\n${myLottoAmount}개를 구매했습니다.`);

    /* 개별 로또 출력 */
    const generateRepititions = Array(myLottoAmount).fill(0);
    const myLottoArr = generateRepititions.map(() => {
      const numbers = generateNumbers();
      const ascNumArr = sortNumbersAsc(numbers);
      return new Lotto(ascNumArr);
    });

    myLottoArr.forEach((lotto) => {
      const numbers = lotto.getNumbers();
      const numbersFormat = numbers.join(', ');
      print(`[${numbersFormat}]`);
    });

    /* 두 번째 입력 */
    await this.setWinnerLotto();

    const winnerNumbers = this.#winnerLotto.getNumbers();

    /* 세 번째 입력 */
    await this.setWinnerBonus(winnerNumbers);

    /* 결과 연산 */
    const bonusLotto = this.#winnerBonus;
    const myLottoResult = getLottoResult(winnerNumbers, bonusLotto, myLottoArr);

    /* 결과 출력 */
    print('\n당첨 통계');
    print('---');

    Object.entries(LOTTOT_PRICE).forEach(([match, price]) => {
      const amount = myLottoResult[match];

      print(`${match} 일치 (${price.toLocaleString()}원) - ${amount}개`);
    });

    const cash = this.#store.getPaidCash();
    const profitRate = calculateProfitRate(myLottoResult, cash);
    print(`총 수익률은 ${profitRate}%입니다.`);
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
}

export default App;

import LottoController from './controller/LottoController.js';

class App {
  #lottoGame;

  constructor() {
    this.#lottoGame = new LottoController();
  }

  async run() {
    await this.#lottoGame.purchaseLotto();

    this.#lottoGame.showPurchasedLottos();

    await this.#lottoGame.setJackpotLotto();

    await this.#lottoGame.setBonusNumber();

    this.#lottoGame.showLottoResult();
  }
}

export default App;

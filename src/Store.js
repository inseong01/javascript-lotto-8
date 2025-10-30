class Store {
  #cash;

  constructor(cash) {
    this.#validate(cash);
    this.#cash = Number(cash);
  }

  #validate(cash) {
    if (cash % 1000 !== 0) {
      throw new Error('[ERROR] 천원 단워로 입력해주세요.');
    }
  }

  getLottoAmount() {
    const amount = this.#cash / 1000;
    return amount;
  }

  getPaidCash() {
    return Number(this.#cash);
  }
}

export default Store;

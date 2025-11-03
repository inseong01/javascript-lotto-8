import Validator from '../utility/validator.js';

class Cash {
  #cash;

  constructor(string) {
    this.#validate(string);
    this.#cash = Number(string);
  }

  #validate(string) {
    Validator.validateCash(string);
  }

  getPaidCash() {
    return this.#cash;
  }

  getAmountBy(productPrice) {
    return this.#cash / productPrice;
  }
}

export default Cash;

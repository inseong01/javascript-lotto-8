import Validator from '../utility/validate.js';

class Cash {
  #cash;

  constructor(cash) {
    Validator.validateCash(cash);
    this.#cash = Number(cash);
  }

  getPaidCash() {
    return this.#cash;
  }
}

export default Cash;

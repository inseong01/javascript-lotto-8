import Validator from '../utility/validate.js';

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
}

export default Cash;

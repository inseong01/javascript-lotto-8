import Validator from '../utility/validate.js';

class BonusNumber {
  #number;

  constructor(string, jackpotNumbers) {
    this.#validate(string, jackpotNumbers);
    this.#number = Number(string);
  }

  #validate(string, jackpotNumbers) {
    Validator.validateBonusNumber(string, jackpotNumbers);
  }

  getNumber() {
    return this.#number;
  }

  matches(myLottoNumbers) {
    return myLottoNumbers.includes(this.#number);
  }
}

export default BonusNumber;

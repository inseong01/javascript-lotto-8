import { ERROR_MESSAGE } from './const/message.js';
import { NOT_NUMBER_REGX } from './const/utility.js';
import { LOTTO_NUMBER_AMOUNT, MAX_RANGE, MIN_RANGE } from './const/lottoGame.js';

class Validator {
  static validateCash(string) {
    const trimmedString = string.trim();

    if (NOT_NUMBER_REGX.test(trimmedString)) {
      throw new Error(ERROR_MESSAGE.CASH_HAS_STRING);
    }

    const number = Number(trimmedString);

    if (number === 0) {
      throw new Error(ERROR_MESSAGE.CASH_IS_ZERO);
    }

    if (Math.sign(number) !== 1) {
      throw new Error(ERROR_MESSAGE.CASH_IS_NOT_POSITIVE);
    }

    if (number % 1000 !== 0) {
      throw new Error(ERROR_MESSAGE.CASH_HAS_CHANGE);
    }
  }

  static validateLotto(numbers) {
    if (numbers.length !== LOTTO_NUMBER_AMOUNT) {
      throw Error(ERROR_MESSAGE.LOTTO_IS_NOT_SIX_ELEMENT);
    }

    const hasString = numbers.some((num) => typeof num === 'string');
    const hasNaN = numbers.some((num) => (NOT_NUMBER_REGX).test(num));
    if (hasString && hasNaN) {
      throw Error(ERROR_MESSAGE.LOTTO_HAVE_STRING);
    }

    if (numbers.some((num) => num > MAX_RANGE || num < MIN_RANGE)) {
      throw Error(ERROR_MESSAGE.LOTTO_OUT_OF_RANGE);
    }

    if (new Set(numbers).size !== numbers.length) {
      throw Error(ERROR_MESSAGE.LOTTO_IS_DUPLICATED);
    }
  }

  static validateBonusNumber(string, lotto = []) {
    const trimmedString = string.trim();

    if (trimmedString.length === 0) {
      throw Error(ERROR_MESSAGE.BONUS_IS_EMPTY);
    }

    if (NOT_NUMBER_REGX.test(trimmedString)) {
      throw Error(ERROR_MESSAGE.BONUS_HAS_STRING);
    }

    const number = Number(trimmedString);

    if (number > MAX_RANGE || number < MIN_RANGE) {
      throw Error(ERROR_MESSAGE.BONUS_OUT_OF_RANGE);
    }

    if (lotto.length !== LOTTO_NUMBER_AMOUNT) {
      throw new Error(ERROR_MESSAGE.BONUS_HAS_NO_COMPARE);
    }

    if (lotto.includes(number)) {
      throw Error(ERROR_MESSAGE.BONUS_IS_DUPLICATED);
    }
  }
}

export default Validator;

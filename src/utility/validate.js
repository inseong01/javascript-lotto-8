class Validator {
  // TODO 메시지 상수 처리
  static message = '[ERROR]';

  static validateCash(string) {
    const trimmedString = string.trim();

    if (/\D/.test(trimmedString)) throw new Error(this.message);

    const number = Number(trimmedString);

    if (number === 0) throw new Error(this.message);

    if (Math.sign(number) !== 1) throw new Error(this.message);

    if (number % 1000 !== 0) throw new Error(this.message);
  }

  static validateLotto(string) {
    // TODO: 유틸리티로 분리
    const splitedNumbers = string.split(',');
    const numbers = splitedNumbers.map((num) => num.trim());

    if (numbers.length !== 6) throw Error(this.message);

    if (numbers.some((num) => (/\D/).test(num))) throw Error(this.message);

    if (numbers.some((num) => num > 45 || num < 1)) throw Error(this.message);

    if (new Set(numbers).size !== numbers.length) throw Error(this.message);
  }

  static validateBonusNumber(string, lotto) {
    const trimmedString = string.trim();

    if (trimmedString) throw Error(this.message);

    if (/\D/.test(trimmedString)) throw Error(this.message);

    const number = Number(trimmedString);

    if (number > 45 || number < 1) throw Error(this.message);

    if (lotto.includes(number)) throw Error(this.message);
  }
}

export default Validator;

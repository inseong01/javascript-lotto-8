class BonusLotto {
  #bonus;

  constructor(bonus, lottoNums) {
    this.#validate(bonus, lottoNums);
    this.#bonus = Number(bonus);
  }

  #validate(bonus, lottoNums = []) {
    if (!bonus) {
      throw new Error('[ERROR] 보너스 번호를 입력해주세요.');
    }
    const isSmallTha0 = bonus <= 0;
    if (isSmallTha0) {
      throw new Error('[ERROR] 1-45 사이의 보너스 번호를 입력해주세요.');
    }

    const isBiggerThan45 = bonus > 45;
    if (isBiggerThan45) {
      throw new Error('[ERROR] 1-45 사이의 보너스 번호를 입력해주세요.');
    }

    const hasText = /\D/.test(bonus);
    if (hasText) {
      throw new Error('[ERROR] 1-45 사이의 보너스 번호를 입력해주세요.');
    }

    if (lottoNums.includes(Number(bonus))) {
      throw new Error('[ERROR] 보너스 번호는 로또 번호와 중복될 수 없습니다.');
    }
  }

  /**
   * 로또 번호와 보너스 번호의 일치 여부 반환
   * @param {string[]} lottoNums 당첨 번호
   * @returns 2등 여부
   */
  isMatch(lottoNums) {
    const counts = lottoNums.includes(this.#bonus);
    return counts;
  }
}

export default BonusLotto;

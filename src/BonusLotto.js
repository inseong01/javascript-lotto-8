class Lotto {
  #bonus;

  constructor(bonus) {
    this.#validate(bonus);
    this.#bonus = bonus[0];
  }

  #validate(bonus) {
    if (bonus.length !== 1) {
      throw new Error("[ERROR] 로또 번호는 1개여야 합니다.");
    }
  }

  /**
   * 로또 번호와 보너스 번호의 일치 여부 반환
   * @param {number[]} lottoNums 당첨 번호 
   * @returns 2등 여부
   */
  isMatch(lottoNums) {
    const counts = lottoNums.includes(this.#bonus);
    return counts;
  }
}

export default Lotto;

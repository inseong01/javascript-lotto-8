class Lotto {
  #numbers;

  constructor(numbers) {
    this.#validate(numbers);
    this.#numbers = numbers;
  }

  #validate(numbers) {
    if (numbers.length !== 6) {
      throw new Error("[ERROR] 로또 번호는 6개여야 합니다.");
    }

    if (new Set(numbers).size !== numbers.length) {
      throw new Error("[ERROR] 로또 번호는 중복되어서는 안 됩니다.");
    }
  }

  // TODO: 추가 기능 구현

  /**
   * 로또 번호와 당첨 번호가 일치하는 개수를 반환
   * @param {number[]} lottoNums 당첨 번호 
   * @returns {number}
   */
  getMatchCount(lottoNums) {
    const counts = this.#numbers.filter((num) => lottoNums.includes(num));
    return counts.length;
  }
}

export default Lotto;

import { LOTTO_RANK, PRIZE } from './const/LottoGame.js';

export default function getMatchPrompt(rank) {
  switch (rank) {
    case LOTTO_RANK.FIRST: {
      return `6개 일치 (${PRIZE.FIRST_RANK.toLocaleString()}원)`;
    }
    case LOTTO_RANK.SECOND: {
      return `5개 일치, 보너스 볼 일치 (${PRIZE.SECOND_RANK.toLocaleString()}원)`;
    }
    case LOTTO_RANK.THIRD: {
      return `5개 일치 (${PRIZE.THIRD_RANK.toLocaleString()}원)`;
    }
    case LOTTO_RANK.FORTH: {
      return `4개 일치 (${PRIZE.FORTH_RANK.toLocaleString()}원)`;
    }
    case LOTTO_RANK.FIFTH: {
      return `3개 일치 (${PRIZE.FIFTH_RANK.toLocaleString()}원)`;
    }
    default: return '';
  }
}

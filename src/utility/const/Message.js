import {
  LOTTO_NUMBER_AMOUNT,
  LOTTO_PURCHASE_PRICE,
  MAX_RANGE,
  MIN_RANGE,
} from './LottoGame.js';

export const ERROR_MESSAGE = {
  // CASH
  CASH_HAS_STRING: '\n[ERROR] 구입금액은 숫자로 입력해주세요.',
  CASH_IS_ZERO: `\n[ERROR] 구입금액은 ${MIN_RANGE} 이상의 정수로 입력해주세요.`,
  CASH_IS_NOT_POSITIVE: '\n[ERROR] 양의 정수로 입력해주세요.',
  CASH_HAS_CHANGE: `\n[ERROR] ${LOTTO_PURCHASE_PRICE.toLocaleString()}원 단위로 입력해주세요.`,

  // LOTTO
  LOTTO_IS_NOT_SIX_ELEMENT: `\n[ERROR] 로또 번호 ${LOTTO_NUMBER_AMOUNT}개를 입력해주세요.`,
  LOTTO_HAVE_STRING: '\n[ERROR] 로또 번호는 숫자로 입력해주세요.',
  LOTTO_OUT_OF_RANGE: `\n[ERROR] 로또 번호는 ${MIN_RANGE}-${MAX_RANGE} 사이의 숫자로 입력해주세요.`,
  LOTTO_IS_DUPLICATED: '\n[ERROR] 로또 번호는 중복되지 않도록 입력해주세요.',

  // BONUS NUMBER
  BONUS_IS_EMPTY: '\n[ERROR] 보너스 번호를 입력해주세요.',
  BONUS_HAS_STRING: '\n[ERROR] 보너스 번호는 숫자로 입력해주세요.',
  BONUS_OUT_OF_RANGE: `\n[ERROR] ${MIN_RANGE}-${MAX_RANGE} 사이의 숫자로 입력해주세요.`,
  BONUS_HAS_NO_COMPARE: '\n[ERROR] 로또가 생성되지 않았습니다. 다시 실행해주세요.',
  BONUS_IS_DUPLICATED: '\n[ERROR] 보너스 번호는 중복되지 않도록 입력해주세요.',
};

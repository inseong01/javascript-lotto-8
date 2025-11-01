export default function getMatchPrompt(match) {
  switch (match) {
    case 'first': {
      return '6개 일치 (2,000,000,000원)';
    }
    case 'second': {
      return '5개 일치, 보너스 볼 일치 (30,000,000원)';
    }
    case 'third': {
      return '5개 일치 (1,500,000원)';
    }
    case 'forth': {
      return '4개 일치 (50,000원)';
    }
    case 'fifth': {
      return '3개 일치 (5,000원)';
    }
    default: return '';
  }
}

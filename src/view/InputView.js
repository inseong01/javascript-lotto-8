import { MissionUtils } from '@woowacourse/mission-utils';

class InputView {
  static async getLine(prompt) {
    const input = await MissionUtils.Console.readLineAsync(prompt);
    return input;
  }
}

export default InputView;

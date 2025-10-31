import Validator from "../../src/utility/validate"

describe('Validator 클래스 테스트', () => {
  describe('validateCash', () => {

    test('인자가 1000원으로 나눠어지지 않으면 예외를 반환한다.', () => {
      const inputs = ['1200', 'false', '\\n', 'aa', '1', '0', '-1000', '0o1750', '   ', ''];

      inputs.forEach((input) => {
        function fnBox() {
          Validator.validateCash(input);
        }

        expect(fnBox).toThrow('[ERROR]');
      })
    })

    test('인자가 1000원으로 나눠어지면 예외를 반환하지 않는다.', () => {
      const inputs = ['  1000', '3000  ', '10000'];

      inputs.forEach((input) => {
        function fnBox() {
          Validator.validateCash(input);
        }

        expect(fnBox).not.toThrow('[ERROR]');
      })
    })
  })

  describe('validateLotto', () => {
    test('인자가 6개가 아니면 예외를 반환한다.', () => {
      const inputs = ['1,2,3,4,5', '', '1,2,3', '1,2,3,4,5,6,7,8', ',,,,,,,,', ',,,,,,'];

      inputs.forEach((input) => {
        function fnBox() {
          Validator.validateLotto(input);
        }

        expect(fnBox).toThrow('[ERROR]');
      })
    })

    test('번호가 숫자가 아니면 예외를 반환한다.', () => {
      const inputs = ['가,나,다,라,마', 'a,b,c,d,e,f', '!,@,#,$,%,^'];

      inputs.forEach((input) => {
        function fnBox() {
          Validator.validateLotto(input);
        }

        expect(fnBox).toThrow('[ERROR]');
      })
    })

    test('번호가 1-45 사이가 아니면 예외를 반환한다.', () => {
      const inputs = ['0,1,2,3,4,5', '1,22,33,34,40,52', '-1,2,3,4,-34,-22'];

      inputs.forEach((input) => {
        function fnBox() {
          Validator.validateLotto(input);
        }

        expect(fnBox).toThrow('[ERROR]');
      })
    })

    test('번호가 중복되는 경우 예외를 반환한다.', () => {
      const inputs = ['1,1,2,3,4,5', '1,22,33,33,40,52', '2,4,1,4,34,22'];

      inputs.forEach((input) => {
        function fnBox() {
          Validator.validateLotto(input);
        }

        expect(fnBox).toThrow('[ERROR]');
      })
    })

    test('정상적으로 번호를 입력하면 예외가 반환되지 않는다.', () => {
      const inputs = [' 1,2,3,4,5 ,6 ', '1 ,22,33, 34,40,45 ', '1,20,3,4,34 ,22'];

      inputs.forEach((input) => {
        function fnBox() {
          Validator.validateLotto(input);
        }

        expect(fnBox).not.toThrow('[ERROR]');
      })
    })
  })

  describe('validateBonusNumber', () => {
    test('인자가 숫자가 아니면 예외를 반환한다.', () => {
      const inputs = ['false', '', 'a', '가나'];

      inputs.forEach((input) => {
        function fnBox() {
          Validator.validateBonusNumber(input);
        }

        expect(fnBox).toThrow('[ERROR]');
      })
    })

    test('번호가 1-45 사이가 아니면 예외를 반환한다.', () => {
      const inputs = ['-1', '0', '46', '100'];

      inputs.forEach((input) => {
        function fnBox() {
          Validator.validateBonusNumber(input);
        }

        expect(fnBox).toThrow('[ERROR]');
      })
    })

    test('번호가 로또 번호와 중복되면 예외를 반환한다.', () => {
      const LOTTO = [1, 2, 3, 4, 5, 6];
      const inputs = ['1', '2', '3', '4'];

      inputs.forEach((input) => {
        function fnBox() {
          Validator.validateBonusNumber(input, LOTTO);
        }

        expect(fnBox).toThrow('[ERROR]');
      })
    })

    test('로또 번호가 할당되지 않으면 예외를 반환한다.', () => {
      const LOTTO = [];
      const inputs = ['2', '3', '4'];

      inputs.forEach((input) => {
        function fnBox() {
          Validator.validateBonusNumber(input, LOTTO);
        }

        expect(fnBox).toThrow('[ERROR]');
      })
    })

    test('정상적인 번호를 입력하면 예외를 반환하지 않는다.', () => {
      const LOTTO = [1, 2, 3, 4, 5, 6];
      const inputs = ['10', '   20', '30   ', '45'];

      inputs.forEach((input) => {
        function fnBox() {
          Validator.validateBonusNumber(input, LOTTO);
        }

        expect(fnBox).not.toThrow('[ERROR]');
      })
    })
  })
})
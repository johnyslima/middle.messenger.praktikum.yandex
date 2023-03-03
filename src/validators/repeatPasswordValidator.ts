import Block from "../utils/Block";
import { Validator } from "./Validator";
import { PasswordErrorText } from "./errorText";

export class RepeatPasswordValidator extends Validator {
  static validate(componentFirst: Block, componentSecond: Block): boolean {

    if(componentSecond.getValue() === "") {
      this.addError(componentSecond, PasswordErrorText.MinLength)
      return false
    }

    if (componentFirst.getValue() !== componentSecond.getValue()) {
      this.addErrorPassword(
        componentFirst,
        componentSecond,
        PasswordErrorText.NoRepeatPassword
      );
      return false;
    } else {
      this.removeErrors();
    }
    
    this.removeError(componentSecond);
    return true;
  }
}

import Block from "../utils/Block";
import { Validator } from "./Validator";
import { LoginErrorText } from "./errorText";
import { RegExpVariants } from "./regExpVariants";

export class LoginValidator extends Validator {
  private static minLength: number = 3;
  private static maxLength: number = 20;

  static validate(value: string, component: Block): boolean {
    if (value.length < this.minLength) {
      this.addError(component, LoginErrorText.MinLength);
      return false;
    }

    if (value.length >= this.maxLength) {
      this.addError(component, LoginErrorText.MaxLength);
      return false;
    }

    if (!new RegExp(RegExpVariants.Spaces).test(value)) {
      this.addError(component, LoginErrorText.Spaces);
      return false;
    }

    if (new RegExp(RegExpVariants.OnlyNumbers).test(value)) {
      this.addError(component, LoginErrorText.OnlyNumbers);
      return false;
    }

    if (!new RegExp(RegExpVariants.SpecialSybmols).test(value)) {
      this.addError(component, LoginErrorText.SpecialSybmols);
      return false;
    }

    this.removeError(component);
    return true;
  }
}

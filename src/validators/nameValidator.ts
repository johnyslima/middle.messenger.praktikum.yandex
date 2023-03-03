import Block from "../utils/Block";
import { Validator } from "./Validator";
import { NameErrorText } from "./errorText";
import { RegExpVariants } from "./regExpVariants";

export class NameValidator extends Validator {
  private static minLength: number = 3;
  private static maxLength: number = 20;

  static validate(value: string, component: Block): boolean {
    if (value === "") {
      this.addError(component, NameErrorText.Empty);
      return false;
    }

    if (!new RegExp(RegExpVariants.Spaces).test(value)) {
      this.addError(component, NameErrorText.Spaces);
      return false;
    }

    if (new RegExp(RegExpVariants.OnlyLiterals).test(value)) {
      this.addError(component, NameErrorText.OnlyNumbers);
      return false;
    }

    if (!new RegExp(RegExpVariants.SpecialSybmols).test(value)) {
      this.addError(component, NameErrorText.SpecialSybmols);
      return false;
    }

    if (value[0] == value[0].toLowerCase()) {
      this.addError(component, NameErrorText.FirstLowerCase);
      return false;
    }

    this.removeError(component);
    return true;
  }
}

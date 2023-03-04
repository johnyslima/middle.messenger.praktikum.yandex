import Block from "../utils/Block";
import { Validator } from "./Validator";
import { EmailErrorText } from "./errorText";
import { RegExpVariants } from "./regExpVariants";

export class EmailValidator extends Validator {
  static validate(value: string, component: Block): boolean {
    if (value === "") {
      this.addError(component, EmailErrorText.Empty);
      return false;
    }

    if (!new RegExp(RegExpVariants.Email).test(value)) {
      this.addError(component, EmailErrorText.Incorrect);
      return false;
    }
    this.removeError(component);
    return true;
  }
}

import Block from "../utils/Block";
import { Validator } from "./Validator";
import { PhoneErrorText } from "./errorText";
import { RegExpVariants } from "./regExpVariants";

export class PhoneValidator extends Validator {
  static validate(value: string, component: Block): boolean {
    if (value === "") {
      this.removeError(component);
      return true;
    }
    
    if (!new RegExp(RegExpVariants.Phone).test(value)) {
      this.addError(component, PhoneErrorText.Incorrect);
      return false;
    }

    this.removeError(component);
    return true;
  }
}

import Block from "../utils/Block";
import { Validator } from "./Validator";
import { MessageErrorText } from "./errorText";

export class MessageValidator extends Validator {

  static validate(value: string, component: Block): boolean {
    if (value === "") {
      this.addError(component, MessageErrorText.Empty);
      return false;
    }

    this.removeError(component);
    return true;
  }
}

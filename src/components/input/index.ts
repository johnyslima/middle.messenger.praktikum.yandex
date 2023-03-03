import { ValidatorsType } from "../../typings";
import Block from "../../utils/Block";
import templateInput from "./input.hbs";
import templateInputProfile from "./inputProfile.hbs";
import templateInputProfileEditable from "./inputProfileEditable.hbs";
import templateInputSearch from "./inputSearch.hbs";
import templateInputMessageEnter from "./inputMessageEnter.hbs";

export enum InputTypeField {
  LOGIN = "login",
  PROFILE = "profile",
  SEARCH = "search",
  MESSAGE_ENTER = "message_enter",
}

interface FormInputProps {
  placeholder: string;
  events?: {
    blur?: (event: Event) => void;
    focus?: (event: Event) => void;
    click?: (event: Event) => void;
    focusout?: (event: Event) => void;
    keydown?: (event: Event) => void;
  };
  className?: string;
  inputName: string;
  type: string;
  typeField: string;
  editable?: boolean;
  value?: string;
}

export class FormInput extends Block {
  constructor(props: FormInputProps) {
    super({ ...props, editable: props.editable ?? true });
  }

  private getTemplate() {
    switch (this.props.typeField) {
      case InputTypeField.LOGIN:
        return templateInput;
        break;
      case InputTypeField.PROFILE:
        return this.props.editable
          ? templateInputProfileEditable
          : templateInputProfile;
        break;
      case InputTypeField.SEARCH:
        return templateInputSearch;
        break;
      case InputTypeField.MESSAGE_ENTER:
        return templateInputMessageEnter;
        break;
      default:
        return templateInput;
        break;
    }
  }

  getValue() {
    return (this.element?.children[0] as HTMLInputElement).value;
  }

  isValid(validator: ValidatorsType) {
    return validator.validate(this.getValue(), this);
  }

  render() {
    return this.compile(this.getTemplate(), this.props);
  }
}

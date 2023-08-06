import { ValidatorsType } from "../../typings";
import Block from "../../utils/Block";
import templateInput from "./input.hbs";
import templateInputProfile from "./inputProfile.hbs";
import templateInputProfileEditable from "./inputProfileEditable.hbs";
import templateInputSearch from "./inputSearch.hbs";
import templateInputMessageEnter from "./inputMessageEnter.hbs";
import templateInputFile from "./inputFile.hbs";

export enum InputTypeField {
  LOGIN = "login",
  PROFILE = "profile",
  SEARCH = "search",
  MESSAGE_ENTER = "message_enter",
  FILE_INPUT = "file",
  TEXT = "text"
}

interface FormInputProps {
  placeholder?: string;
  accept?: string;
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
      case InputTypeField.TEXT:
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
      case InputTypeField.FILE_INPUT:
        return templateInputFile;
        break;
      default:
        return templateInput;
        break;
    }
  }

  getValue() {
    return (this.element?.children[0] as HTMLInputElement).value;
  }

  getFile() {
    let elem: any = (this.element?.children[0] as HTMLInputElement)
    return (elem?.files[0] as string | Blob);
  }

  isValid(validator: ValidatorsType) {
    return validator.validate(this.getValue(), this);
  }

  render() {
    return this.compile(this.getTemplate(), this.props);
  }
}

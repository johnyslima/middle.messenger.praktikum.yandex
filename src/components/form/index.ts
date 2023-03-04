import Block from "../../utils/Block";
import template from "./form-layout.hbs";
import { TemplateDelegate } from "handlebars";

interface IFormEvents {
  submit: (event: Event) => void;
}

interface FormProps {
  events: IFormEvents;
  className?: string;
  template: TemplateDelegate | TemplateDelegate[];
  formHead?: string;
  formBody: Block | string;
  formFooterButton?: Block;
  formFooterLink?: Block;
}

export class Form extends Block {
  constructor(props: FormProps) {
    super(props);
  }

  render() {
    return this.compile(template, this.props);
  }
}

import { Button, ButtonType } from "../../../components";
import Block from "../../../utils/Block";
import template from "./errorPage.hbs";

export class Error404 extends Block {
  constructor(props?: any) {
    super(props);
  }

  init() {
    this.children.ButtonBackLink = new Button({
      label: "Назад к чатам",
      className: "status-error-page__back-link",
      events: {
        click: (event: Event) => {
          console.log('hereLink')
        }
      },
      typeButton: ButtonType.LINK
    });
  }

  render() {
    return this.compile(template, { ...this.props });
  }
}

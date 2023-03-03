import { Button, ButtonType } from "../../../components";
import Block from "../../../utils/Block";
import template from "./errorPage.hbs";

export class Error500 extends Block {
  constructor(props?: any) {
    super(props);
  }

  init() {
    this.children.ButtonBackLink = new Button({
      label: "Назад к чатам",
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

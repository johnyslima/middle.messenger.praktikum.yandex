import { Button, ButtonType } from "../../../components";
import { Pages } from "../../../typings";
import Block from "../../../utils/Block";
import { renderDom } from "../../../utils/Routers";
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
          renderDom(Pages.CHAT)
        }
      },
      typeButton: ButtonType.LINK
    });
  }

  render() {
    return this.compile(template, { ...this.props });
  }
}

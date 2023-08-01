import { Button, ButtonType } from "../../../components";
import router from "../../../routing/router";
import { CHAT_PAGE } from "../../../routing/routes";
import { PageType } from "../../../typings";
import Block from "../../../utils/Block";
import template from "./errorPage.hbs";

export class Error404 extends Block {
  constructor(props?: PageType) {
    super(props);
  }

  init() {
    this.children.ButtonBackLink = new Button({
      label: "Назад к чатам",
      className: "status-error-page__back-link",
      events: {
        click: (event: Event) => {
          event.preventDefault();
          router.go(CHAT_PAGE)
        }
      },
      typeButton: ButtonType.LINK
    });
  }

  render() {
    return this.compile(template, { ...this.props });
  }
}

import Block from "../../utils/Block";
import template from "./main.hbs";
import { Button, ButtonType } from "../../components";
import { ChildType, Pages, PageType } from "../../typings";
import router from "../../routing/router";


export class Main extends Block {
  constructor(props?: PageType) {
    super(props);
  }

  init() {
    let child: ChildType = this.children;

    const buttonToLogin = new Button({
      label: "Login page ›",
      className: "chat-left-field__profile-link",
      events: {
        click: (event: Event) => {
          event.preventDefault();
          router.go('/login');
        },
      },
      typeButton: ButtonType.LINK,
    });

    const buttonToSignIn = new Button({
      label: "SignIn page ›",
      className: "chat-left-field__profile-link",
      events: {
        click: (event: Event) => {
          event.preventDefault();
          router.go('/signUp');
        },
      },
      typeButton: ButtonType.LINK,
    });

    const buttonToChat = new Button({
      label: "Chat page ›",
      className: "chat-left-field__profile-link",
      events: {
        click: (event: Event) => {
          event.preventDefault();
          router.go('/chat');
        },
      },
      typeButton: ButtonType.LINK,
    });

    const buttonToProfile = new Button({
      label: "Profile page ›",
      className: "chat-left-field__profile-link",
      events: {
        click: (event: Event) => {
          event.preventDefault();
          router.go('/profile');
        },
      },
      typeButton: ButtonType.LINK,
    });

    const buttonToError404 = new Button({
      label: "Error 404 page ›",
      className: "chat-left-field__profile-link",
      events: {
        click: (event: Event) => {
          event.preventDefault();
          router.go('/404');
        },
      },
      typeButton: ButtonType.LINK,
    });

    const buttonToError500 = new Button({
      label: "Error 500 page ›",
      className: "chat-left-field__profile-link",
      events: {
        click: (event: Event) => {
          event.preventDefault();
          router.go('/500');
        },
      },
      typeButton: ButtonType.LINK,
    });

    child.ButtonToLogin = buttonToLogin;
    child.ButtonToSignIn = buttonToSignIn;
    child.ButtonToChat = buttonToChat;
    child.ButtonToProfile = buttonToProfile;
    child.ButtonToError404 = buttonToError404;
    child.ButtonToError500 = buttonToError500;

  }


  render() {
    return this.compile(template, { ...this.props });
  }
}

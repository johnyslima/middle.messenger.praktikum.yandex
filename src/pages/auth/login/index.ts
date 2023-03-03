import Block from "../../../utils/Block";
import { Button, ButtonType, Form, FormInput } from "../../../components";
import { LoginBody } from "../../../blocks";
import template from "./login.hbs";
import { LoginValidator, PasswordValidator } from "../../../validators";
import { renderDom } from "../../../utils/Routers";
import { Pages } from "../../../typings";

export class Login extends Block {
  constructor(props?: any) {
    super(props);
  }

  init() {
    const formContent = new LoginBody({});

    const formLink = new Button({
      label: "Нет аккаунта?",
      events: {
        click: (event: Event) => {
          renderDom(Pages.SIGN_UP)
        }
      },
      typeButton: ButtonType.LINK
    });

    const form = new Form({
      template: template,
      className: "form",
      events: {
        submit: (event: Event) => {
          event.preventDefault();
          const loginField = formContent.children.LoginInput as FormInput;
          const passwordField = formContent.children.PasswordInput as FormInput;

          if(loginField.isValid(LoginValidator) && passwordField.isValid(PasswordValidator)) {
            console.log({
              login: loginField.getValue(),
              password: passwordField.getValue(),
            });
            setTimeout(() => renderDom(Pages.CHAT), 1000)
          } else {
            console.error('Некоторые поля не проходят валидацию')
          }
        },
      },
      formHead: "Вход",

      formBody: formContent,

      formFooterButton: new Button({
        label: "Авторизоваться",
        className: "button button--primary",
        typeButton: ButtonType.PRIMARY
      }),

      formFooterLink: formLink,
    });

    this.children.Form = form;
  }

  render() {
    return this.compile(template, { ...this.props });
  }
}

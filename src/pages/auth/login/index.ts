import Block from "../../../utils/Block";
import { Button, ButtonType, Form, FormInput } from "../../../components";
import { LoginBody } from "../../../blocks";
import template from "./login.hbs";
import { LoginValidator, PasswordValidator } from "../../../validators";
import { withStore } from '../../../utils/Store'; 
import LoginController from "../../../controllers/LoginController";
import { Pages, PageType } from "../../../typings";
import router from "../../../routing/router";
import { REGISTRATION_PAGE } from "../../../routing/routes";

export class Login extends Block {
  constructor(props?: PageType) {
    super(props);
  }

  init() {
    const formContent = new LoginBody({});

    const formLink = new Button({
      label: "Нет аккаунта?",
      events: {
        click: (event: Event) => {
          event.preventDefault();
          router.go(REGISTRATION_PAGE);
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
            LoginController.signin({
              login: loginField.getValue(),
              password: passwordField.getValue(),
            }); 
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

const withStateToProps = withStore((state) => ({ ...state.user }))

export default withStateToProps(Login as typeof Block);

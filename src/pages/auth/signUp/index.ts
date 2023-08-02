import Block from "../../../utils/Block";
import { Button, ButtonType, Form, FormInput } from "../../../components";
import { SignUpBody } from "../../../blocks";
import {
  LoginValidator,
  PasswordValidator,
  EmailValidator,
  NameValidator,
  PhoneValidator,
  RepeatPasswordValidator,
} from "../../../validators";
import template from "../login/login.hbs";
import { PageType } from "../../../typings";
import LoginController from "../../../controllers/LoginController";
import router from "../../../routing/router";
import { LOGIN_PAGE } from "../../../routing/routes";

export class SignUp extends Block {
  constructor(props?: PageType) {
    super(props);
  }

  init() {
    const formContent = new SignUpBody({});
    const formLink = new Button({
      label: "Войти",
      events: {
        click: (event: Event) => {
          event.preventDefault();
          router.go(LOGIN_PAGE);
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

          const emailField = formContent.children.EmailInput as FormInput;
          const loginField = formContent.children.LoginInput as FormInput;
          const firstNameField = formContent.children
            .FirstNameInput as FormInput;
          const secondNameField = formContent.children
            .SecondNameInput as FormInput;
          const phoneField = formContent.children.PhoneInput as FormInput;
          const passwordField = formContent.children.PasswordInput as FormInput;
          const passwordRepeatField = formContent.children
            .PasswordRepeatInput as FormInput;

          let hasError: boolean = false;

          if (!loginField.isValid(LoginValidator)) hasError = true;
          if (!emailField.isValid(EmailValidator)) hasError = true;
          if (!firstNameField.isValid(NameValidator)) hasError = true;
          if (!secondNameField.isValid(NameValidator)) hasError = true;
          if (!phoneField.isValid(PhoneValidator)) hasError = true;
          if (!passwordField.isValid(PasswordValidator)) hasError = true;
          if (
            !RepeatPasswordValidator.validate(
              passwordField,
              passwordRepeatField
            )
          )
            hasError = true;

          if (hasError) {
            console.error("Некоторые поля не проходят валидацию");
            return;
          }

          LoginController.signup({
            first_name: firstNameField.getValue(),
            second_name: secondNameField.getValue(),
            login: loginField.getValue(),
            email: emailField.getValue(),
            password: passwordField.getValue(),
            phone: phoneField.getValue(),
          }); 

          console.log({
            email: emailField.getValue(),
            firstName: firstNameField.getValue(),
            secondName: secondNameField.getValue(),
            phone: phoneField.getValue(),
            login: loginField.getValue(),
            password: passwordField.getValue(),
          });
        },
      },

      formHead: "Регистрация",

      formBody: formContent,

      formFooterButton: new Button({
        label: "Зарегистрироваться",
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

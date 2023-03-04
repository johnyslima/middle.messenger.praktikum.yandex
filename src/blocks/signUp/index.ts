import Block from "../../utils/Block";
import { FormInput } from "../../components/input";
import template from "./signUpBody.hbs";
import { ChildType } from "../../typings/childType";
import {
  LoginValidator,
  EmailValidator,
  NameValidator,
  PasswordValidator,
  PhoneValidator,
} from "../../validators";

export class SignUpBody extends Block {
  constructor(props: unknown) {
    super(props);
  }

  init() {
    let child: ChildType = this.children;
    const emailField: FormInput = new FormInput({
      placeholder: "Почта",
      inputName: "email",
      type: "email",
      typeField: "login",
      events: {
        focusout: () => {
          emailField.isValid(EmailValidator);
        },
      },
    });
    const loginField: FormInput = new FormInput({
      placeholder: "Логин",
      inputName: "login",
      type: "text",
      typeField: "login",
      events: {
        focusout: () => {
          loginField.isValid(LoginValidator);
        },
      },
    });
    const firstNameField: FormInput = new FormInput({
      placeholder: "Имя",
      inputName: "first_name",
      type: "text",
      typeField: "login",
      events: {
        focusout: () => {
          firstNameField.isValid(NameValidator);
        },
      },
    });
    const secondNameField: FormInput = new FormInput({
      placeholder: "Фамилия",
      inputName: "second_name",
      type: "text",
      typeField: "login",
      events: {
        focusout: () => {
          secondNameField.isValid(NameValidator);
        },
      },
    });
    const phoneField = new FormInput({
      placeholder: "Телефон",
      inputName: "phone",
      type: "tel",
      typeField: "login",
      events: {
        focusout: () => {
          phoneField.isValid(PhoneValidator);
        },
      },
    });
    const passwordField = new FormInput({
      placeholder: "Пароль",
      inputName: "password",
      type: "password",
      typeField: "login",
      events: {
        focusout: () => {
          passwordField.isValid(PasswordValidator);
        },
      },
    });
    const passwordRepeatField = new FormInput({
      placeholder: "Пароль(повтор)",
      inputName: "password_repeat",
      type: "password",
      typeField: "login",
      events: {
        focusout: () => {
          passwordField.isValid(PasswordValidator);
        },
      },
    });

    child.EmailInput = emailField;
    child.LoginInput = loginField;
    child.FirstNameInput = firstNameField;
    child.SecondNameInput = secondNameField;
    child.PhoneInput = phoneField;
    child.PasswordInput = passwordField;
    child.PasswordRepeatInput = passwordRepeatField;
  }

  render() {
    return this.compile(template, this.props);
  }
}

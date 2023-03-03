import Block from "../../utils/Block";
import { FormInput } from "../../components/input";
import template from "./loginBody.hbs";
import { LoginValidator, PasswordValidator } from "../../validators";
import { ChildType } from "../../typings/childType";

export class LoginBody extends Block {
  constructor(props: unknown) {
    super(props);
  }

  init() {
    let child: ChildType = this.children;
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

    const passwordField: FormInput = new FormInput({
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

    child.LoginInput = loginField;
    child.PasswordInput = passwordField;
  }

  render() {
    return this.compile(template, this.props);
  }
}

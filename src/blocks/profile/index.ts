import Block from "../../utils/Block";
import { FormInput, InputTypeField } from "../../components/input";
import template from "./profile.hbs";
import templateChangePassword from "./changePasswordProfile.hbs";
import { ChildType } from "../../typings/childType";
import {
  LoginValidator,
  EmailValidator,
  NameValidator,
  PasswordValidator,
  PhoneValidator,
} from "../../validators";
import { PROFILE_CHANGE_PASSWORD_PAGE, PROFILE_PAGE } from "../../routing/routes";

export default class ProfileBody extends Block {
  private getTemplate() {
    switch (window.location.pathname) {
      case PROFILE_PAGE:
        return template;
        break;
      case PROFILE_CHANGE_PASSWORD_PAGE:
        return templateChangePassword;
        break;
      default:
        return template;
        break;
    }
  }

  private isEditable() {
    return window.location.pathname === PROFILE_PAGE ? false : true
  }

  init() {
    const { login, first_name, second_name, avatar, display_name, id, phone, email } = this.props.data 
    let child: ChildType = this.children;
    const emailField: FormInput = new FormInput({
      placeholder: "Почта",
      inputName: "email",
      type: "email",
      typeField: InputTypeField.PROFILE,
      editable: this.isEditable(),
      value: email,
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
      typeField: InputTypeField.PROFILE,
      editable: this.isEditable(),
      value: login,
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
      typeField: InputTypeField.PROFILE,
      editable: this.isEditable(),
      value: first_name,
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
      typeField: InputTypeField.PROFILE,
      editable: this.isEditable(),
      value: second_name,
      events: {
        focusout: () => {
          secondNameField.isValid(NameValidator);
        },
      },
    });
    const displayNameField: FormInput = new FormInput({
      placeholder: "Имя в чате",
      inputName: "display_name",
      type: "text",
      typeField: InputTypeField.PROFILE,
      editable: this.isEditable(),
      value: display_name || first_name,
      events: {
        focusout: () => {
          displayNameField.isValid(NameValidator);
        },
      },
    });
    const phoneField = new FormInput({
      placeholder: "Телефон",
      inputName: "phone",
      type: "tel",
      typeField: InputTypeField.PROFILE,
      editable: this.isEditable(),
      value: phone,
      events: {
        focusout: () => {
          phoneField.isValid(PhoneValidator);
        },
      },
    });

    const oldPasswordField = new FormInput({
      placeholder: "Старый пароль",
      inputName: "password",
      type: "password",
      typeField: InputTypeField.PROFILE,
      editable: this.isEditable(),
      events: {
        focusout: () => {
          oldPasswordField.isValid(PasswordValidator);
        },
      },
    });
    const newPasswordField = new FormInput({
      placeholder: "Новый пароль",
      inputName: "password_repeat",
      type: "password",
      typeField: InputTypeField.PROFILE,
      editable: this.isEditable(),
      events: {
        focusout: () => {
          newPasswordField.isValid(PasswordValidator);
        },
      },
    });
    const newPasswordRepeatField = new FormInput({
      placeholder: "Повторите новый пароль",
      inputName: "password_repeat",
      type: "password",
      typeField: InputTypeField.PROFILE,
      editable: this.isEditable(),
      events: {
        focusout: () => {
          newPasswordRepeatField.isValid(PasswordValidator);
        },
      },
    });

    child.EmailInput = emailField;
    child.LoginInput = loginField;
    child.FirstNameInput = firstNameField;
    child.SecondNameInput = secondNameField;
    child.DisplayNameInput = displayNameField;
    child.PhoneInput = phoneField;

    child.OldPasswordInput = oldPasswordField;
    child.NewPasswordInput = newPasswordField;
    child.RepeatNewPasswordInput = newPasswordRepeatField;
  }

  render() {
    return this.compile(this.getTemplate(), this.props);
  }
}

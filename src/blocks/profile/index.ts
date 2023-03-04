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
import { Pages } from "../../typings/pagesType";

export class ProfileBody extends Block {
  constructor(props: unknown) {
    super(props);
  }

  private getTemplate() {
    switch (this.props.currentPage) {
      case Pages.PROFILE:
        return template;
        break;
      case Pages.PROFILE_CHANGE_PASSWORD:
        return templateChangePassword;
        break;
      default:
        return template;
        break;
    }
  }

  private isEditable() {
    return this.props.currentPage === Pages.PROFILE ? false : true
  }

  init() {
    let child: ChildType = this.children;
    const emailField: FormInput = new FormInput({
      placeholder: "Почта",
      inputName: "email",
      type: "email",
      typeField: InputTypeField.PROFILE,
      editable: this.isEditable(),
      value: "pochta@yandex.ru",
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
      value: "ivanivanov",
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
      value: "Иван",
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
      value: "Иванов",
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
      value: "Иван",
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
      value: "+7-909-967-30-30",
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

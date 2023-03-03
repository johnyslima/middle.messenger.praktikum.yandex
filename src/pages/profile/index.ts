import { Avatar } from "../../components/avatar";
import { Button, ButtonType, Form, FormInput } from "../../components";
import Block from "../../utils/Block";
import templateProfile from "./profile.hbs";
import arrowLeftIconSvg from "../../assets/icons/arrow_left.svg";
import {
  LoginValidator,
  PasswordValidator,
  EmailValidator,
  NameValidator,
  PhoneValidator,
  RepeatPasswordValidator,
} from "../../validators";
import { ProfileBody } from "../../blocks";
import { ChildType, Pages, PageType } from "../../typings";
import { renderDom } from "../../utils/Routers";

export class Profile extends Block {
  constructor(props?: PageType) {
    super(props);
  }

  init() {
    let child: ChildType = this.children;
    const isPageProfile: boolean = this.props.currentPage === Pages.PROFILE;
    const isPageProfileEdit: boolean =
      this.props.currentPage === Pages.PROFILE_EDIT;
    const isPageProfilePasswordEdit: boolean =
      this.props.currentPage === Pages.PROFILE_CHANGE_PASSWORD;
    const buttonBack = new Button({
      className: "profile-page__button-back",
      events: {
        click: (event: Event) => {
          event.preventDefault();
          renderDom(Pages.CHAT)
        },
      },
      icon: arrowLeftIconSvg,
      typeButton: ButtonType.ICON,
    });

    const buttonSave = new Button({
      label: "Сохранить",
      className: "button button--primary",
      events: {
        click: (event: Event) => {
          event.preventDefault();
          const emailField = formContent.children.EmailInput as FormInput;
          const loginField = formContent.children.LoginInput as FormInput;
          const firstNameField = formContent.children
            .FirstNameInput as FormInput;
          const secondNameField = formContent.children
            .SecondNameInput as FormInput;
          const phoneField = formContent.children.PhoneInput as FormInput;
          const displayNameField = formContent.children
            .DisplayNameInput as FormInput;
          const oldPasswordField = formContent.children
            .OldPasswordInput as FormInput;
          const newPasswordRepeatField = formContent.children
            .NewPasswordInput as FormInput;
          const repeatNewPasswordField = formContent.children
            .RepeatNewPasswordInput as FormInput;

          let hasError: boolean = false;

          if (isPageProfileEdit) {
            if (!loginField.isValid(LoginValidator)) hasError = true;
            if (!emailField.isValid(EmailValidator)) hasError = true;
            if (!firstNameField.isValid(NameValidator)) hasError = true;
            if (!secondNameField.isValid(NameValidator)) hasError = true;
            if (!displayNameField.isValid(NameValidator)) hasError = true;
            if (!phoneField.isValid(PhoneValidator)) hasError = true;
          }

          if (isPageProfilePasswordEdit) {
            if (!newPasswordRepeatField.isValid(PasswordValidator))
              hasError = true;
            if (
              !RepeatPasswordValidator.validate(
                newPasswordRepeatField,
                repeatNewPasswordField
              )
            )
              hasError = true;
          }

          if (hasError) {
            console.error("Некоторые поля не проходят валидацию");
            return;
          }

          if (isPageProfileEdit) {
            console.log({
              email: emailField.getValue(),
              firstName: firstNameField.getValue(),
              secondName: secondNameField.getValue(),
              phone: phoneField.getValue(),
              login: loginField.getValue(),
              DisplayNameField: displayNameField.getValue(),
            });
          }

          if (isPageProfilePasswordEdit) {
            console.log({
              oldPassword: oldPasswordField.getValue(),
              newPassword: newPasswordRepeatField.getValue(),
              newPasswordRepeat: repeatNewPasswordField.getValue(),
            });
          }

          renderDom(Pages.PROFILE)
        },
      },
      typeButton: ButtonType.PRIMARY,
    });

    const buttonChangeData = new Button({
      label: "Изменить данные",
      className: "profile-page__form-actions__edit",
      events: {
        click: (event: Event) => {
          event.preventDefault();
          renderDom(Pages.PROFILE_EDIT)
        },
      },
      typeButton: ButtonType.LINK,
    });

    const buttonChangePassword = new Button({
      label: "Изменить пароль",
      className: "profile-page__form-actions__edit",
      events: {
        click: (event: Event) => {
          event.preventDefault();
          renderDom(Pages.PROFILE_CHANGE_PASSWORD)
        },
      },
      typeButton: ButtonType.LINK,
    });

    const buttonLogout = new Button({
      label: "Выйти",
      className: "profile-page__form-actions__logout",
      events: {
        click: (event: Event) => {
          event.preventDefault();
          renderDom(Pages.LOGIN)
        },
      },
      typeButton: ButtonType.LINK,
    });

    const avatar = new Avatar({
      nameUser: "Иван",
    });

    const formContent = new ProfileBody({
      currentPage: this.props.currentPage,
    });

    const form = new Form({
      template: templateProfile,
      className: "profile-page__form-info",
      events: {
        submit: (event: Event) => {
          event.preventDefault();
        },
      },
      formBody: formContent,
    });

    child.ButtonBack = buttonBack;
    child.Avatar = avatar;
    child.Form = form;

    if (isPageProfile) {
      child.ButtonChangeData = buttonChangeData;
      child.ButtonChangePassword = buttonChangePassword;
      child.ButtonLogout = buttonLogout;
    } else {
      child.ButtonSave = buttonSave;
    }
  }

  render() {
    return this.compile(templateProfile, { ...this.props });
  }
}

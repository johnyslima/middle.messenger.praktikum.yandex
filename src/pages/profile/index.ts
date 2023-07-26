import { Avatar } from "../../components/avatar";
import { Button, ButtonType, Form, FormInput, Modal } from "../../components";
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
import { ProfileBody, ChangeAvatarBody } from "../../blocks";
import { ChildType, PageType } from "../../typings";
import router from "../../routing/router";
import LoginController from "../../controllers/LoginController";
import { withStore } from "../../utils/Store";
import ProfileController from "../../controllers/ProfileController";
import { Url } from "../../typings/url";
import { CHAT_PAGE, PROFILE_CHANGE_PASSWORD_PAGE, PROFILE_EDIT_PAGE, PROFILE_PAGE } from "../../routing/routes";

class ProfilePageBase extends Block {
  constructor(props?: PageType) {
    super(props);
  }

  init() {
    // LoginController.fetchUser();
    let child: ChildType = this.children;
    const isPageProfile: boolean = window.location.pathname === PROFILE_PAGE;
    const isPageProfileEdit: boolean =
      window.location.pathname === PROFILE_EDIT_PAGE;
    const isPageProfilePasswordEdit: boolean =
      window.location.pathname === PROFILE_CHANGE_PASSWORD_PAGE;

    const formContent = new ProfileBody({data: this.props});
  
    const form = new Form({
      className: "profile-page__form-info",
      events: {
        submit: (event: Event) => {
          event.preventDefault();
        },
      },
      formBody: formContent,
     });

    const buttonBack = new Button({
      className: "profile-page__button-back",
      events: {
        click: (event: Event) => {
          event.preventDefault();
          if(isPageProfileEdit || isPageProfilePasswordEdit) {
            router.go(PROFILE_PAGE)
          } else {
            router.go(CHAT_PAGE)
          }
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
            ProfileController.update({
              first_name: firstNameField.getValue(),
              second_name: secondNameField.getValue(),
              display_name: displayNameField.getValue(),
              login: loginField.getValue(),
              email: emailField.getValue(),
              phone: phoneField.getValue()
          });
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
            ProfileController.changePassword(oldPasswordField.getValue(), newPasswordRepeatField.getValue());
            console.log({
              oldPassword: oldPasswordField.getValue(),
              newPassword: newPasswordRepeatField.getValue(),
              newPasswordRepeat: repeatNewPasswordField.getValue(),
            });
          }
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
          router.go(PROFILE_EDIT_PAGE)
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
          router.go(PROFILE_CHANGE_PASSWORD_PAGE)
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
          LoginController.logout();
        },
      },
      typeButton: ButtonType.LINK,
    });

    const modalAction = new Modal({
      title: "Загрузите файл",
      visible: "hide",
      body: new Form({
        className: "modal__form-change-avatar",
        events: {
          submit: (event: Event) => {
            event.preventDefault();
          },
        },
        formBody: new ChangeAvatarBody({data: this.props}),
        formFooterButton: new Button({
            label: "Поменять",
            className: "button button--primary",
            events: {
              click: (event: Event) => {
                event.preventDefault();
                const fileField = modalAction.children.body.children.formBody.children.FileInput as FormInput;
                const fileAvatar = fileField.getFile();
                const formData = new FormData();
                formData.append("avatar", fileAvatar)
                ProfileController.changeAvatar(formData)
              },
            },
            typeButton: ButtonType.PRIMARY,
          })
      }),
      events: {
        click: (event: Event) => {
          event.stopPropagation();
          const target = event.target as HTMLElement;
          if(target.matches('.modal-wrap-background')) {
            modalAction.closeModal()
          }
        },
      },
    });

    const avatar = new Avatar({
      nameUser: this.props.display_name || this.props.first_name,
      img: `${Url.RESOURCE}${this.props.avatar}`,
      isEdit: isPageProfileEdit,
      changeAvatarBtn: new Button({
        className: "avatar-change-button",
        events: {
          click: (event: Event) => {
            event.preventDefault();
            modalAction.openModal()
          },
        },
        label: "Поменять аватар",
        typeButton: ButtonType.LINK,
      })
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
      child.ModalContext = modalAction;
    }
  }

  render() {
    return this.compile(templateProfile, { ...this.props});
  }
}

const withStateToProps = withStore((store) => {
  console.log('store', store)
  return({ 
  ...store.user.data
})})

export default withStateToProps(ProfilePageBase as typeof Block);

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
import { ChildType, Pages, PageType } from "../../typings";
// import { renderDom } from "../../utils/Routers";
import router from "../../routing/router";
import LoginController from "../../controllers/LoginController";
import { withStore } from "../../utils/Store";
import ProfileController from "../../controllers/ProfileController";
import { Url } from "../../typings/url";

class ProfilePageBase extends Block {
  constructor(props?: PageType) {
    super(props);
  }

  init() {
    // LoginController.fetchUser();
    console.log('this.props', this.props)
    let child: ChildType = this.children;
    const isPageProfile: boolean = window.location.pathname === Pages.PROFILE;
    const isPageProfileEdit: boolean =
      window.location.pathname === Pages.PROFILE_EDIT;
    const isPageProfilePasswordEdit: boolean =
      window.location.pathname === Pages.PROFILE_CHANGE_PASSWORD;

    const formContent = new ProfileBody({data: this.props});
    const formAvatar = new ChangeAvatarBody({data: this.props});
  
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

    const formModal = new Form({
      template: templateProfile,
      className: "modal__form-change-avatar",
      events: {
        submit: (event: Event) => {
          event.preventDefault();
        },
      },
      formBody: formAvatar,
      formFooterButton: new Button({
          label: "Поменять",
          className: "button button--primary",
          events: {
            click: (event: Event) => {
              event.preventDefault();
              // router.go(Pages.PROFILE)
              const fileField = formAvatar.children.FileInput as FormInput;
              const fileAvatar = fileField.getFile();
              console.log('fileField', fileAvatar)
              const formData = new FormData();
              formData.append("avatar", fileAvatar)
              ProfileController.changeAvatar(formData)
            },
          },
          typeButton: ButtonType.PRIMARY,
        })
    })

    const buttonBack = new Button({
      className: "profile-page__button-back",
      events: {
        click: (event: Event) => {
          event.preventDefault();
          if(isPageProfileEdit || isPageProfilePasswordEdit) {
            router.go(Pages.PROFILE)
          } else {
            router.go(Pages.CHAT)
          }
          // renderDom(Pages.CHAT)
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

          // router.go(Pages.PROFILE)
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
          router.go(Pages.PROFILE_EDIT)
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
          router.go(Pages.PROFILE_CHANGE_PASSWORD)
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
          // router.go(Pages.LOGIN)
        },
      },
      typeButton: ButtonType.LINK,
    });

    const modalAction = new Modal({
      state: {
        show: false
      },
      className: "avatar-modal",
      title: "Загрузите файл",
      body: formModal,
      events: {
        click: (event: Event) => {
          event.stopPropagation();
          const { state } = modalAction.getProps();
          const target = event.target as HTMLElement;
          if(target.matches('.modal-wrap-background')) {
            modalAction.setProps({
              state: {
                show: state.show ? false : true
              }
            })
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
            const { state } = modalAction.getProps();
            modalAction.setProps({
                    state: {
                      show: state.show ? false : true
                    }
                })
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

const withProfile = withStore((store) => ({ 
  ...store.user.data
}))

export default withProfile(ProfilePageBase as typeof Block);

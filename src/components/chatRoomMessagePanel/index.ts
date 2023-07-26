import { ChildType } from "../../typings";
import Block from "../../utils/Block";
import { Button, ButtonType } from "../button";
import addIconSvg from "../../assets/icons/add_icon.svg";
import arrowRightIconSvg from "../../assets/icons/arrow_right.svg";
import photoAttachIconSvg from "../../assets/icons/photo_attach.svg";
import fileAttachIconSvg from "../../assets/icons/file_attach.svg";
import locationAttachIconSvg from "../../assets/icons/location_attach.svg";
import template from "./chatRoomMessagePanel.hbs";
import { FormInput, InputTypeField } from "../input";
import { MessageValidator, NameValidator } from "../../validators";
import Tooltip from "../tootlip";
import TooltipAction from "../tooltipAction";
import MessagesController from "../../controllers/MessagesController";
import { withStore } from "../../utils/Store";
import { Form } from "../form";
import { ChangeAvatarBody } from "../../blocks";
import { Modal } from "../modal";
import { IResource } from "../../api/resourcesApi";

class ChatRoomMessagePanel extends Block {

  init() {
    let child: ChildType = this.children;

    const mediaAction = new Tooltip({
      visible: "hide",
      className: "chat-room-header__name__context-attachment-tooltip",
      actions: [
        new TooltipAction({
          icon: photoAttachIconSvg,
          iconClassName: " ib-22px primary-color",
          text: "Фото или Видео",
          events: {
            click: () => {
              modalAction.setProps({
                title: "Отправить фото или видео",
                body: new Form({
                  className: "modal__form-change-avatar",
                  formBody: new FormInput({
                    inputName: "file",
                    type: "text",
                    typeField: "file",
                    accept: "image/png, image/gif, image/jpeg",
                  }),
                  formFooterButton: new Button({
                    label: "Отправить",
                    className: "button button--primary",
                    events: {
                      click: async (event: Event) => {
                        event.preventDefault();
                        const fileField = modalAction.children.body.children.formBody as FormInput;
                        console.log('fileField', fileField.getFile())
                        const fileAvatar = fileField.getFile();
                        const formData = new FormData();
                        formData.append("resource", fileAvatar);
                        const file: IResource = await MessagesController.sendFile(formData);
                        console.log('MessagesController', MessagesController)
                        MessagesController.sendMessage(this.props.selectedChat, (file.id).toString(), 'file');
                        modalAction.closeModal();
                      },
                    },
                    typeButton: ButtonType.PRIMARY,
                  }),
                }),
              });
              console.log("Фото или Видео");
              modalAction.openModal();
            },
          },
        }),
        new TooltipAction({
          icon: fileAttachIconSvg,
          iconClassName: " ib-22px primary-color",
          text: "Файл",
          events: {
            click: () => {
              modalAction.setProps({
                title: "Отправить файл",
                body: new Form({
                  className: "modal__form-change-avatar",
                  formBody: new FormInput({
                    inputName: "file",
                    type: "text",
                    typeField: "file",
                    accept: ".pdf, .txt, .xls, .word",
                  }),
                  formFooterButton: new Button({
                    label: "Отправить",
                    className: "button button--primary",
                    events: {
                      click: async (event: Event) => {
                        event.preventDefault();
                        const fileField = modalAction.children.body.children.formBody as FormInput;
                        const fileAvatar = fileField.getFile();
                        const formData = new FormData();
                        formData.append("resource", fileAvatar);
                        const file: IResource = await MessagesController.sendFile(formData);
                        MessagesController.sendMessage(this.props.selectedChat, (file.id).toString(), 'file');
                        modalAction.closeModal();
                      },
                    },
                    typeButton: ButtonType.PRIMARY,
                  }),
                }),
              });
              console.log("Файл");
              modalAction.openModal();
            },
          },
        }),
        //   new TooltipAction({
        //     icon: locationAttachIconSvg,
        //     iconClassName: ' ib-22px primary-color',
        //     text: 'Локация',
        //     events: {
        //         click: () => {
        //             // this._modal.setProps({
        //             //     title: 'Отправить Фото или Видео',
        //             //     state: 'show',
        //             //     body: new Browse({
        //             //         onSubmit: (e: SubmitEvent) => {
        //             //             console.log('Отправить Фото или Видео')
        //             //         }
        //             //     })
        //             // })
        //             console.log('Фото или Видео')
        //         }
        //     }
        // })
      ],
    });

    const modalAction = new Modal({
      title: "",
      visible: "hide",
      events: {
        click: (event: Event) => {
          const target = event.target as HTMLElement;
          if (target.matches(".modal-wrap-background")) {
            modalAction.closeModal();
          }
        },
      },
    });

    const buttonAttachment = new Button({
      className: "chat-room-header__name__context-attachment-button",
      events: {
        click: (event: Event) => {
          event.preventDefault();
          mediaAction.openModal();
        },
      },
      icon: addIconSvg,
      typeButton: ButtonType.ICON,
    });

    const messageEnterField = new FormInput({
      placeholder: "Введите сообщение",
      inputName: "message",
      type: "text",
      typeField: InputTypeField.MESSAGE_ENTER,
      editable: true,
      className: "message-enter",
    });

    const buttonMessageSend = new Button({
      className: "message-send",
      events: {
        click: (event: Event) => {
          event.preventDefault();

          if (!messageEnterField.isValid(MessageValidator)) {
            console.error("Поле не должно быть пустым");
            return;
          }

          const message = messageEnterField.getValue();
          console.log("messageEnterField", messageEnterField, message);
          MessagesController.sendMessage(this.props.selectedChat, message);
          console.log(messageEnterField.getValue());
        },
      },
      icon: arrowRightIconSvg,
      typeButton: ButtonType.ICON,
    });

    child.ButtonAttachment = buttonAttachment;
    child.TooltipAttachmentContext = mediaAction;
    child.InputMessageField = messageEnterField;
    child.ButtonMessageSend = buttonMessageSend;
    child.ModalContext = modalAction;
  }

  render() {
    return this.compile(template, this.props);
  }
}

const withStateToProps = withStore((state) => {
  return {
    selectedChat: state.selectedChat,
  };
});

export default withStateToProps(ChatRoomMessagePanel as typeof Block);

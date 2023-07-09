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

interface ChatRoomHeaderProps {
  avatar?: string;
  roomName?: string;
}

export class ChatRoomMessagePanel extends Block {

  constructor(props: ChatRoomHeaderProps) {
    super(props)
  }

  init() {
    let child: ChildType = this.children;
    
    

    const mediaAction = new Tooltip({
      state: {
        show: false
      },
      className: "chat-room-header__name__context-attachment-tooltip",
      actions: [
          new TooltipAction({
              icon: photoAttachIconSvg,
              iconClassName: ' ib-22px primary-color',
              text: 'Фото или Видео',
              events: {
                  click: () => {
                      // this._modal.setProps({
                      //     title: 'Отправить Фото или Видео',
                      //     state: 'show',
                      //     body: new Browse({
                      //         onSubmit: (e: SubmitEvent) => {
                      //             console.log('Отправить Фото или Видео')
                      //         }
                      //     })
                      // })
                      console.log('Фото или Видео')
                  }
              }
          }),
          new TooltipAction({
            icon: fileAttachIconSvg,
            iconClassName: ' ib-22px primary-color',
            text: 'Файл',
            events: {
                click: () => {
                    // this._modal.setProps({
                    //     title: 'Отправить Фото или Видео',
                    //     state: 'show',
                    //     body: new Browse({
                    //         onSubmit: (e: SubmitEvent) => {
                    //             console.log('Отправить Фото или Видео')
                    //         }
                    //     })
                    // })
                    console.log('Фото или Видео')
                }
            }
        }),
        new TooltipAction({
          icon: locationAttachIconSvg,
          iconClassName: ' ib-22px primary-color',
          text: 'Локация',
          events: {
              click: () => {
                  // this._modal.setProps({
                  //     title: 'Отправить Фото или Видео',
                  //     state: 'show',
                  //     body: new Browse({
                  //         onSubmit: (e: SubmitEvent) => {
                  //             console.log('Отправить Фото или Видео')
                  //         }
                  //     })
                  // })
                  console.log('Фото или Видео')
              }
          }
      })
      ]
  });

  const buttonAttachment = new Button({
    className: "chat-room-header__name__context-attachment-button",
    events: {
      click: (event: Event) => {
        event.preventDefault();
        console.log("buttonAttachment");
        const { state } = mediaAction.getProps();
        console.log('state', state)
        mediaAction.setProps({
                state: {
                  show: state.show ? false : true
                }
                // state: state === 'display-block' ? 'display-none' : 'display-block'
            })
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
      className: "message-enter"
    });

    const buttonMessageSend = new Button({
      className: "message-send",
      events: {
        click: (event: Event) => {
          if(!messageEnterField.isValid(MessageValidator)) {
            console.error('Поле не должно быть пустым')
            return
          }
          console.log(messageEnterField.getValue())
        },
      },
      icon: arrowRightIconSvg,
      typeButton: ButtonType.ICON,
    });

    child.ButtonAttachment = buttonAttachment;
    child.TooltipAttachmentContext = mediaAction;
    child.InputMessageField = messageEnterField;
    child.ButtonMessageSend = buttonMessageSend;

  }

  render() {
    return this.compile(template, this.props);
  }
}

import { ChildType, MessageType } from "../../typings";
import Block from "../../utils/Block";
import template from "./chatRoomContent.hbs";
import { MessageCloud } from "../message";

interface ChatRoomContentProps {
  messages?: MessageType[]
}

export class ChatRoomContent extends Block {

  constructor(props: ChatRoomContentProps) {
    super(props)
  }

  init() {
    let child: ChildType = this.children;
    const messages = this.props.messages.map(
      (message: MessageType) => new MessageCloud({
        type: message.type,
        MessageText: message.messageText
      }),
    );

    child.MessagesArr = messages

  }

  render() {
    return this.compile(template, this.props);
  }
}

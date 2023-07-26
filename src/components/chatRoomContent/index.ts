import { ChildType, MessageType, Url } from "../../typings";
import Block from "../../utils/Block";
import template from "./chatRoomContent.hbs";
import { MessageCloud } from "../message";
import { withStore } from "../../utils/Store";
import { DateFormat } from "../../helpers/DateFormat";
import { contentType } from "../../helpers/contentType";

interface ChatRoomContentProps {
  messages?: MessageType[]
}

class ChatRoomContent extends Block {

  constructor(props: ChatRoomContentProps) {
    super(props)
  }

  init() {
    let child: ChildType = this.children;
    const messages = this.props.messages || []
    child.MessagesArr = messages?.map(
      (message: MessageType) => {
        contentType(message?.file)
        return new MessageCloud({
          type: message?.user_id === this.props.userId ? "message-to" : "message-from",
          MessageText: message.content,
          Time: DateFormat(message.time),
          file: contentType(message?.file) === "text" ? `${message?.file?.path}` : null,
          img: contentType(message?.file) === "image" ? `${Url.RESOURCE}${message?.file?.path}` : null
      })}
      )
  }

  render() {
    return this.compile(template, this.props);
  }
}

const withStateToProps = withStore(state => {
  const selectedChatId = state.selectedChat; 

  if (!selectedChatId) {
      return {
        messages: [],
        selectedChat: state.selectedChat,
        userId: state.user.data.id,
      };
  }

  return {
      messages: (state.messages || {})[selectedChatId] || [],
      selectedChat: state.selectedChat,
      userId: state.user.data.id,
  };
});

export default withStateToProps(ChatRoomContent as typeof Block);

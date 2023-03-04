import { RoomType } from "../../typings";
import Block from "../../utils/Block";
import template from "./chatListItem.hbs";

export class ChatListItem extends Block {
  constructor(props: RoomType) {
    super(props);
  }

  render() {
    return this.compile(template, this.props);
  }
}

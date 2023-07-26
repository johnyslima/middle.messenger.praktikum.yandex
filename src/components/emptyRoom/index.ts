import Block from "../../utils/Block";
import template from "./emptyRoom.hbs";

export class EmptyRoom extends Block {

  render() {
    return this.compile(template, this.props);
  }
}

import Block from "../../utils/Block";
import template from "./messageCloud.hbs";

export class MessageCloud extends Block {
  constructor(props: any) {
    super(props);
  }

  render() {
    return this.compile(template, this.props);
  }
}

import Block from "../../utils/Block";
import { FormInput } from "../../components/input";
import template from "./changeAvatar.hbs";
import { ChildType } from "../../typings/childType";

export class ChangeAvatarBody extends Block {
  constructor(props: unknown) {
    super(props);
  }

  init() {
    let child: ChildType = this.children;
    const fileField: FormInput = new FormInput({
      className: "file_avatar",
      inputName: "file",
      type: "text",
      typeField: "file",
    });



    child.FileInput = fileField;
  }

  render() {
    return this.compile(template, this.props);
  }
}

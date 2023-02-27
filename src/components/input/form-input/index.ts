import Block from "../../../utils/Block";
import template from "./input.hbs";

interface FormInputProps {
    placeholder: string;
    events?: {
        blur: (event: Event) => void;
        focus: (event: Event) => void;
        click: (event: Event) => void;
    };
    className?: string;
    inputName: string;
    type?: string;
}

export class FormInput extends Block {
    constructor(props: FormInputProps) {
        console.log(props)
        super(props);
    }

    get value() {
        return (this.element.children[0] as HTMLInputElement).value;
    }

    render() {
        return this.compile(template, this.props);
    }
}

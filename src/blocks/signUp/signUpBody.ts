import Block from "../../utils/Block";
import { FormInput } from "../../components/input/form-input";
import template from "./signUpBody.hbs";

interface ButtonProps {
    label: string;
    events?: {
        click: (event: Event) => void;
    };
    className?: string;
}

export class SignUpBody extends Block {
    constructor(props: any) {
        super(props);
    }

    init() {

        this.children.EmailInput = new FormInput({
            placeholder: "Почта",
            inputName: "email",
            type: "email",
        });
        this.children.LoginInput = new FormInput({
            placeholder: "Логин",
            inputName: "login",
            type: "text"
        });
        this.children.FirstNameInput = new FormInput({
            placeholder: "Имя",
            inputName: "first_name",
            type: "text"
        });
        this.children.SecondNameInput = new FormInput({
            placeholder: "Фамилия",
            inputName: "second_name",
            type: "text"
        });
        this.children.PhoneInput = new FormInput({
            placeholder: "Телефон",
            inputName: "phone",
            type: "tel"
        });
        this.children.PasswordInput = new FormInput({
            placeholder: "Пароль",
            inputName: "password",
            type: "password"
        });
        this.children.PasswordRepeatInput = new FormInput({
            placeholder: "Пароль(повтор)",
            inputName: "password_repeat",
            type: "password"
        });
    }

    render() {
        return this.compile(template, this.props);
    }
}

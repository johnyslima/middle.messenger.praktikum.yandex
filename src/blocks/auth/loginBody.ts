import Block from "../../utils/Block";
import { FormInput } from "../../components/input/form-input";
import template from "./loginBody.hbs";

interface ButtonProps {
    label: string;
    events?: {
        click: (event: Event) => void;
    };
    className?: string;
}

export class LoginBody extends Block {
    constructor(props: any) {
        super(props);
    }

    init() {
        this.children.LoginInput = new FormInput({
            placeholder: "Логин",
            inputName: "login",
            type: "text",
            events: {
                blur: () => {
                  const { value } = this.children.LoginInput;
                  console.log(this.children.LoginInput)
                //   isValid(validateLogin(value), 'login-error', 'sign-in-login-input');
                },
                focus: () => {
                    const { element } = this.children.LoginInput;
                    console.log(element)
                  //   isValid(validateLogin(value), 'login-error', 'sign-in-login-input');
                  },
                  click: (event) => {
                    const { value } = this.children.LoginInput;
                    console.log(this.children.LoginInput)
                    console.log(value)
                },
              },
            // events: {
            //     click: (event) => this.onSubmit(event),
            // },
            // className: "button button--primary"
        });
        
        this.children.PasswordInput = new FormInput({
            placeholder: "Пароль",
            inputName: "password",
            type: "password"
            // events: {
            //     click: (event) => this.onSubmit(event),
            // },
            // className: "button button--primary"
        });
    }

    render() {
        return this.compile(template, this.props);
    }
}

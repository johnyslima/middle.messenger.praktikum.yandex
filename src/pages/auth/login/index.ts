import Block from "../../../utils/Block";
import { Button } from "../../../components/button";
import { Form } from "../../../components/form";
import { Link } from "../../../components/link";
import { LoginBody } from "../../../blocks/auth/loginBody";
import template from "./login.hbs";

export class Login extends Block {
    constructor(props?: any) {
        super(props);
    }

    init() {
        const form = new Form({
            template: template,
            events: {
              submit: (event: Event) => {
                event.preventDefault();
    
                // const login = loginField.getValue();
                // const password = passwordField.getValue();
                
                // if(login.length === 0 || password.length === 0) {
                //   return;
                // }
                
                console.log('here')
              }
            }, 
            formHead: "Вход",

            formBody: new LoginBody({}),

            formFooterButton: new Button({
                label: "Авторизоваться",
                events: {
                    click: (event) => this.onSubmit(event),
                },
                className: "button button--primary"
            }),
            
            formFooterLink: new Link({
                label: 'Нет аккаунта?'
            })
          });

          this.children.Form = form;
    }

    onSubmit(event) {
        event?.preventDefault();
        console.log("Clicks", this.children.Form.children);
    }

    render() {
        return this.compile(template, { ...this.props });
    }
}

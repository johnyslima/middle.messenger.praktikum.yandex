import Block from "../../../utils/Block";
import { Button } from "../../../components/button";
import { Form } from "../../../components/form";
import { Link } from "../../../components/link";
import { SignUpBody } from "../../../blocks/signUp/signUpBody";
import template from "../login/login.hbs";

export class SignUp extends Block {
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
            formHead: "Регистрация",

            formBody: new SignUpBody({}),

            formFooterButton: new Button({
                label: "Зарегистрироваться",
                events: {
                    click: (event) => this.onSubmit(event),
                },
                className: "button button--primary"
            }),
            
            formFooterLink: new Link({
                label: 'Войти'
            })
          });

          this.children.Form = form;
    }

    onSubmit(event) {
        event?.preventDefault();
        console.log("Clicks");
    }

    render() {
        return this.compile(template, { ...this.props });
    }
}

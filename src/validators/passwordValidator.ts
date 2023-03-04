import Block from "../utils/Block";
import { Validator } from "./Validator";
import { PasswordErrorText } from "./errorText";
import { RegExpVariants } from "./regExpVariants";

export class PasswordValidator extends Validator {

    private static minLength: number = 8;
    private static maxLength: number = 40;

    static validate(value: string, component: Block): boolean 
    { 

        if(value.length < this.minLength){
            this.addError(component, PasswordErrorText.MinLength)
            return false
        }

        if(value.length >= this.maxLength){
            this.addError(component, PasswordErrorText.MaxLength)
            return false
        }

        if (!new RegExp(RegExpVariants.HasOneNumber).test(value)) {
            this.addError(component, PasswordErrorText.HasOneNumber)
            return false
        }

        if (!new RegExp(RegExpVariants.HasOneUpperCase).test(value)) {
            this.addError(component, PasswordErrorText.HasOneUpperCase)
            return false
        }

        this.removeError(component)
        return true
    } 
}

import {
  EmailValidator,
  LoginValidator,
  NameValidator,
  PasswordValidator,
} from "../validators";

export type ValidatorsType =
  | typeof LoginValidator
  | typeof PasswordValidator
  | typeof NameValidator
  | typeof EmailValidator;

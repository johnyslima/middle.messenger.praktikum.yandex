export type ErrorTextType = LoginErrorText | PasswordErrorText | NameErrorText | EmailErrorText | PhoneErrorText | MessageErrorText

export enum LoginErrorText {
    Incorrect = 'Логин должен быть указан из латинских символов',
    MinLength = 'Логин должен содержать не менее 3 символов',
    MaxLength = 'Логин должен содержать не более 20 символов',
    Spaces = 'Логин не должен содержать пробелы',
    OnlyNumbers = 'Логин не должен состоять только из цифр',
    SpecialSybmols = 'Логин содержит спец символы (допустимы только - и _)'
};

export enum PasswordErrorText {
    HasOneNumber = 'Пароль должен содержать хотя бы 1 цифру',
    HasOneUpperCase = 'Пароль должен содержать хотя бы 1 заглавную букву',
    MinLength = 'Пароль должен содержать не менее 8 символов',
    MaxLength = 'Пароль должен содержать не более 40 символов',
    Spaces = 'Логин не должен содержать пробелы',
    OnlyNumbers = 'Логин не должен состоять только из цифр',
    SpecialSybmols = 'Логин содержит спец символы (допустимы только - и _)',
    NoRepeatPassword = 'Пароли не совпадают'
};

export enum NameErrorText {
  Empty = 'Необходимо заполнить',
  FirstLowerCase = 'Первая буква должна быть заглавная',
  Spaces = 'Строка не должна содержать пробелы',
  OnlyNumbers = 'Строка не должна содержать цифры',
  SpecialSybmols = 'Строка содержит спец символы (допустимы только дефис "-")'

};
export enum EmailErrorText {
  Incorrect = 'Неккоректно указан email',
  Empty = 'Необходимо заполнить',
};

export enum PhoneErrorText {
  Incorrect = 'Неккоректно указан телефон',
};

export enum MessageErrorText {
  Empty = 'Не должно быть пустым'
};

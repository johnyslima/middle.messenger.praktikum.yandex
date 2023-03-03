type RegExpType = {
  [key: string]: RegExp;
};

export const RegExpVariants: RegExpType = {
  Spaces: /^\S*$/,
  OnlyNumbers: /^(\d){1,13}$/g,
  SpecialSybmols: /(?:\s|^)[\p{L}0-9\-._]+(?:\s|$)/u,
  HasOneNumber: /(?=.*[0-9])/g,
  HasOneUpperCase: /(?=.*[A-Z])/g,
  OnlyLiterals: /^.*[^A-zА-яЁё].*$/g,
  Email: /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g,
  Phone: /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/g
};

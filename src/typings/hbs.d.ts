declare module "*.hbs" {
  import { TemplateDelegate } from 'handlebars';

  declare const template: TemplateDelegate;

  export default template;
};
declare module "*.yaml";
declare module "*.runtime";
declare module 'handlebars-layouts';
declare module '*.svg';
declare module '*.png';
declare module '*.handlebars.runtime';

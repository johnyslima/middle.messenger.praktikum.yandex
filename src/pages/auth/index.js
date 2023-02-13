import templateLogin from "./login.hbs";
import templateSignIn from "./login.hbs";
import Handlebars from "handlebars/dist/handlebars.runtime";

Handlebars.registerPartial("login", templateLogin);
Handlebars.registerPartial("signIn", templateSignIn);

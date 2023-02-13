import template from "./chat-layout.hbs";
import Handlebars from "handlebars/dist/handlebars.runtime";
import Layouts from "handlebars-layouts";

Handlebars.registerPartial("chat-layout", template);
Handlebars.registerHelper(Layouts(Handlebars));

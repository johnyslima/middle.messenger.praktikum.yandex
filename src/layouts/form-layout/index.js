import template from "./form-layout.hbs";
import Handlebars from "handlebars/dist/handlebars.runtime";
import Layouts from "handlebars-layouts";

Handlebars.registerPartial("form-layout", template);
Handlebars.registerHelper(Layouts(Handlebars));

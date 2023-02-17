import templateInput from "./input.hbs";
import templateInputProfile from "./inputProfile.hbs";
import Handlebars from "handlebars/dist/handlebars.runtime";

Handlebars.registerPartial("input", templateInput);
Handlebars.registerPartial("inputProfile", templateInputProfile);

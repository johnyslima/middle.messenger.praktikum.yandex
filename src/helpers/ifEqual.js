import Handlebars from "handlebars/dist/handlebars.runtime";

Handlebars.registerHelper("ifEquals", function (arg1, arg2, options) {
  console.log("arg1", arg1);
  console.log("arg2", arg2);
  return arg1 == arg2 ? options.fn(this) : options.inverse(this);
});

// Handlebars.registerHelper("ifEquals", function (v1, v2, options) {
//   if (v1 === v2) {
//     return options.fn(this);
//   }
//   return options.inverse(this);
// });
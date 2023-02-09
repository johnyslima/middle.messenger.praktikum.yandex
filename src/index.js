import template from "./template.hbs";

function render(html) {
  const app = document.querySelector("#root");
  app.innerHTML = html;
}

window.addEventListener("DOMContentLoaded", () => {
  const context = { name: "whorte" };
  // const context = { name: { first: "john", last: "doe" } };

  const html = template(context);

  render(html);
});

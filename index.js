import main from "./src/index.hbs";
import data from "./src/data/data.yaml";
import login from "./src/pages/auth/login.hbs";
import signIn from "./src/pages/auth/signin.hbs";
import chat from "./src/pages/chat/chat.hbs";
import avatar from "./src/assets/images/avatar.png";
import "./src/style/index.pcss";
import "./src/components";
import "./src/layouts";

const ROUTES = {
  main: main,
  login: login,
  signIn: signIn,
  chat: chat,
};

function render(html) {
  const app = document.querySelector("#root");
  app.innerHTML = html;
}

window.goToPage = (name) => {
  console.log("here", name);
  const page = ROUTES[name];
  render(page(data));
};

window.addEventListener("DOMContentLoaded", () => {
  const html = main(data);

  // render(html);
  render(ROUTES.main(data));
});

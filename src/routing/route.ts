import Block from "../utils/Block";

type TProps = Record<string, any>;

function isEqual(lhs: string, rhs: string) {
  return lhs === rhs;
}

function render(query: string, block: Block) {
  const root = document.querySelector(query);
  if (root) {
    root.append(block.getContent()!);
    return root;
  }
  return false;
}

class Route {
  public pathname: string;

  private _blockClass: typeof Block;

  private _block: Block | null;

  private _props: TProps;

  constructor(pathname: string, view: typeof Block, props: TProps) {
    this.pathname = pathname;
    this._blockClass = view;
    this._block = null;
    this._props = props;
  }

  getPathname() {
    return this.pathname;
  }

  navigate(pathname: string) {
    if (this.match(pathname)) {
      this.pathname = pathname;
      this.render();
    }
  }

  leave() {
    if (this._block) {
      this._block.hide();
    }
  }

  match(pathname: string) {
    return isEqual(pathname, this.pathname);
  }

  render() {
    if (!this._block) {
      this._block = new this._blockClass();
      render(this._props.rootQuery, this._block);
      return;
    }

    this._block.show();
  }
}

export default Route;

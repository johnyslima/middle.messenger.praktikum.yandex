import { EventBus } from "./EventBus";
import { nanoid } from 'nanoid';

class Block<P extends Record<string, any> = any, E extends HTMLElement = HTMLElement> {
  getValue(): string {
    throw new Error("Method not implemented.");
  }
  static EVENTS = {
    INIT: "init",
    FLOW_CDM: "flow:component-did-mount",
    FLOW_CDU: "flow:component-did-update",
    FLOW_RENDER: "flow:render"
  };

  public id = nanoid(6);
  protected props: P;
  public children: Record<string, Block>;
  private eventBus: () => EventBus;
  private _element: E | null = null;
  //getValue: () => string;

  /** JSDoc
   * @param {string} tagName
   * @param {Object} props
   *
   * @returns {void}
   */
  constructor(propsWithChildren: P = {} as P) {
    const eventBus = new EventBus();

    const { props, children } = this._getChildrenAndProps(propsWithChildren);

    this.children = (children as Record<string, Block>);
    this.props    = this._makePropsProxy(props);
    this.eventBus = () => eventBus;

    this._registerEvents(eventBus);

    eventBus.emit(Block.EVENTS.INIT);
  }

  _getChildrenAndProps(childrenAndProps: P) {
    const props: P = {} as P;
    const children: Record<string, Block | Block[]> = {};

    Object.entries(childrenAndProps).forEach(([key, value]) => {
      if(Array.isArray(value) && value.every(el => el instanceof Block)) {
        children[key] = value;
      } else if (value instanceof Block) {
        children[key] = value;
      } else {
        props[key as keyof P] = value as P[keyof P];
      }
    });

    return { props, children };
  }

  _addEvents() {
    const { events = {} } = this.props;

    Object.keys(events).forEach((eventName: string) => {
      this._element?.addEventListener(eventName, events[eventName]);
    });
  }

  _removeEvents() {
    const {events = {}} = this.props;

    Object.keys(events).forEach((eventName: string) => { 
      this._element?.removeEventListener(eventName, events[eventName]);
    });
  }

  _registerEvents(eventBus: EventBus) {
    eventBus.on(Block.EVENTS.INIT, this._init.bind(this));
    eventBus.on(Block.EVENTS.FLOW_CDM, this._componentDidMount.bind(this));
    eventBus.on(Block.EVENTS.FLOW_CDU, this._componentDidUpdate.bind(this));
    eventBus.on(Block.EVENTS.FLOW_RENDER, this._render.bind(this));
  }
 
  private _init() {
    this.init();
    this.eventBus().emit(Block.EVENTS.FLOW_RENDER);
  }

  protected init() {}

  _componentDidMount() {
    this.componentDidMount();
  }

  componentDidMount() {}

  public dispatchComponentDidMount() {
    this.eventBus().emit(Block.EVENTS.FLOW_CDM);

    Object.values(this.children).forEach((child: Block) => {
      let childrens = undefined;

      if(Array.isArray(child)) {
        child.map(item => item.dispatchComponentDidMount()); 
      } else {
        childrens = child.dispatchComponentDidMount();
      } 
      return childrens
    });
  }

  private _componentDidUpdate(oldProps: P, newProps: P) {
    if (this.componentDidUpdate(oldProps, newProps)) {
      this.eventBus().emit(Block.EVENTS.FLOW_RENDER);
    }
  }

  protected componentDidUpdate(_oldProps: P, _newProps: P) {
    return true;
  }

  getProps() {
    return this.props;
  }

  setProps = (nextProps: Partial<P>) => {
    if (!nextProps) {
      return;
    }

    Object.assign(this.props, nextProps);
  };

  get element() {
    return this._element;
  }

  private _render() {
    const fragment = this.render();
    
    this._removeEvents();

    const newElement = fragment.firstElementChild as HTMLElement;

    if(this._element) {
      this._element.replaceWith(newElement);
    }
    
    this._element = newElement as E; 

    this._addEvents();
  }

  private _stubReplace(temp: HTMLTemplateElement, child: Block) {
    const stub = temp.content.querySelector(`[data-id="${child.id}"]`);
 
    if (!stub) {
      return;
    }

    child.getContent()?.append(...Array.from(stub.childNodes))

    return stub.replaceWith(child.getContent()!);
  }

  protected compile(template: (context: any) => string, context: any) {
    const contextAndStubs = { ...context }; 
 
    Object.entries(this.children).forEach(([name, component]) => {
      if(Array.isArray(component)) {
        contextAndStubs[name] = component.map((child: Block) => `<div data-id="${child.id}"></div>`);
      } else {
        contextAndStubs[name] = `<div data-id="${component.id}"></div>`;
      }
    }); 
    
    const html: string = template(contextAndStubs);  
    const temp: HTMLTemplateElement = document.createElement('template'); 
    
    temp.innerHTML = html;

    Object.entries(this.children).forEach(([_, component]) => { 
      if(Array.isArray(component)) {
        component.forEach(child => {
          this._stubReplace(temp, child);
        })
      } else { 
        this._stubReplace(temp, component);
      } 
    });

    return temp.content;
  }

  protected render(): DocumentFragment {
    return new DocumentFragment();
  }

  getContent() {
    return this.element;
  }

  _makePropsProxy(props: P) {
    const self = this;

    return new Proxy(props, {
      get(target, prop) {
        const value: any = target[prop as keyof P]; 
        return typeof value === "function" ? value.bind(target) : value;
      },

      set(target, prop, value) {
        const oldTarget:any = { ...target }  
        target[prop as keyof P] = value;
        
        self.eventBus().emit(Block.EVENTS.FLOW_CDU, oldTarget, target);
        return true;
      },

      deleteProperty() {
        throw new Error("Нет доступа");
      }
    });
  }

  show() {
    this.getContent()!.style.display = "block";
  }

  hide() {
    this.getContent()!.style.display = "none";
  }
}

export default Block;

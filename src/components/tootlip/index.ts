import Block from "../../utils/Block";
import template from './tooltip.hbs';

interface TootlipProps {
    state?:any;
    className?: string;
    actions?: Block[];
    events?: {
        click: () => void;
    };
}

export default class Tooltip extends Block {
    
    constructor(props: TootlipProps){ 
      console.log(props.state)
        super(props)
    }
    
    protected render(): DocumentFragment {
        return this.compile(template, this.props);
    }
}

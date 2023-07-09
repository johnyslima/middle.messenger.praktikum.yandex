import Block from "../../utils/Block";
import template from './tooltipAction.hbs';

interface TooltipActionProps {
    className?: string;
    icon?:string;
    iconClassName?: string;
    text?: string;
    events?: {
        click: () => void;
    };
}

export default class TooltipAction extends Block {
    
    constructor(props: TooltipActionProps){
        super(props)
    }

    protected render(): DocumentFragment {
        return this.compile(template, this.props);
    }
}

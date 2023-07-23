import Block from "../../utils/Block";
import template from './modal.hbs';

interface ModalProps {
    state?:any;
    className?: string;
    actions?: Block[];
    events?: {
      click: (event: Event) => void;
    };
    title: string;
    body: any;
    action?: Block;
}

export class Modal extends Block {
    
    constructor(props: ModalProps){ 
      console.log('Modal prop state', props.state)
        super(props) 
    }
    
    protected render(): DocumentFragment {
        return this.compile(template, this.props);
    }
}

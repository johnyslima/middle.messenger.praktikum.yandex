import { set } from './Helpers';
import { EventBus } from './EventBus';
import Block from './Block';
import { ChatData } from '../typings';

export enum StoreEvents {
  Updated = 'updated'
}

export class Store extends EventBus {
  private state: any = {};

  public set(keypath: string, data: unknown) {
    set(this.state, keypath, data);
    this.emit(StoreEvents.Updated, this.getState());
  }

  public getState() {
    return this.state;
  }
}

type TData = {
  data: {
    id: string | number;
  };
  error: string;
  isLoading: boolean;
}

interface IStore {
  user: TData,
  chats: ChatData[],
  messages: ChatData[],
  selectedChat?: any,
}

const store = new Store();

export function withStore(mapStateToProps: (state: IStore) => any) {
  return function wrap(Component: typeof Block){
    return class WithStore extends Component {
      
      constructor(props: any) {
        let previousState = mapStateToProps(store.getState());
        
        super({ ...(props), ...previousState });
        
        store.on(StoreEvents.Updated, () => {
          const stateProps = mapStateToProps(store.getState());
          
          previousState = stateProps;
          this.setProps({ ...stateProps });
        });

      }

    }

  }
}

export default store;

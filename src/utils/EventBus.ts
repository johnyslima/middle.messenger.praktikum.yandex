type CallbackType = (...args: any[]) => void;
export class EventBus {
  private readonly listeners: Record<string, CallbackType[]> = {};

  on(event: string, callback: CallbackType) {
    if (!this.listeners[event]) {
      this.listeners[event] = [];
    }

    this.listeners[event].push(callback);
  }

  off(event: string, callback: CallbackType) {
    if (!this.listeners[event]) {
      throw new Error(`Нет события: ${event}`);
    }

    this.listeners[event] = this.listeners[event].filter(
      listener => listener !== callback
    );
  }

  emit(event: string, ...args: unknown[]) {
    if (!this.listeners[event]) {
      // throw new Event(`Нет события: ${event}`);
      return;
    }

    this.listeners[event].forEach((listener: CallbackType) => {
      listener(...args);
    });
  }
}

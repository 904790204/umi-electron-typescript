const Store = require('electron-store');

export default class UserStore {
  public store = new Store();
  constructor() {
    // this.store.delete('forWord')
  }
  setStore(key: string, value: any): void {
    this.store.set(key, value);
  }
  getStore(key: string): any {
    return this.store.get(key);
  }
  delStore(key: string): void {
    this.store.delete(key);
  }
  clearStore(): void {
    this.store.clear();
  }
}

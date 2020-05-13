const { remote } = window.require('electron');
const store = remote.getGlobal('store');

const forWordState = store.getStore('forWard');
const activeContent = [
  {
    host: 'localhost',
    ip: '127.0.0.1',
  },
];
const leftBar = [
  {
    name: 'base',
    id: 1,
    open: true,
    content: activeContent,
  },
];
export const forWard = {
  leftBar: forWordState ? forWordState.leftBar : leftBar,
  activeContent: forWordState ? forWordState.activeContent : activeContent,
  activeIndex: forWordState ? forWordState.activeIndex : 0,
};

export interface content {
  host: string;
  ip: string;
}
export interface leftBar {
  name: string;
  id: number;
  content: Array<content>;
  open: boolean;
}
export interface forwardState {
  state: {
    leftBar: Array<leftBar>;
    activeContent: Array<content>;
    activeIndex: number;
  };
}

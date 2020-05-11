import { Model } from 'dva';
import { AnyAction } from 'redux';
import { content, forwardState } from '../types/forward';
import * as forward from '../services/forward';

const m: forwardState | Model = {
  namespace: 'forward',
  state: {
    leftBar: [],
    activeContent: [],
    activeIndex: 1,
  },
  effects: {
    *getLeftBar({ payload }, { select, call, put }) {
      let { data } = yield call(forward.fetchLeftBar);
      yield put({
        type: 'save',
        payload: {
          leftBar: data,
        },
      });
      yield put({
        type: 'switchActive',
        payload: {
          activeIndex: yield select((state: any) => state.forward.activeIndex),
        },
      });
    },
    *switchActive({ payload }, { select, call, put }) {
      const leftBar = yield select((state: any) => state.forward.leftBar);
      const { activeIndex } = payload;
      let activeContent: Array<content> = [];
      leftBar.forEach((el: any, index: number) => {
        if (index === activeIndex) {
          activeContent = el.content;
        }
      });
      yield put({
        type: 'save',
        payload: {
          activeIndex,
          activeContent,
        },
      });
    },
  },
  reducers: {
    save(state: forwardState, action: AnyAction) {
      return {
        ...state,
        ...action.payload,
      };
    },
  },
};
export default m;

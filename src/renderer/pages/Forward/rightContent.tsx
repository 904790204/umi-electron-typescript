import React, { useState, useRef, useEffect, useContext } from 'react';
import { connect } from 'dva';
import styles from './index.less';
import { content } from '@/types/forward';
import classname from 'classname';
import CodeMirror from 'codemirror';
import 'codemirror/addon/comment/comment';
import 'codemirror/lib/codemirror.css';
import modeHosts from './cm_hl';
import debounce from 'lodash/debounce';
let stash: any = {};
modeHosts();
function RightContent(props: any) {
  let [codemirror, setCodemirror]: [any, any] = useState(null);
  let textArea = useRef();

  useEffect(() => {
    initCodemirror();
  }, []);
  useEffect(() => {
    let value: string = props.activeContent
      .map((el: any) => el.ip + ' ' + el.host)
      .join('\n');
    codemirror && codemirror.setValue(value);
  }, [props.activeContent]);

  // 初始化CodeMirror
  const initCodemirror = (): void => {
    // 初始化
    let cm = CodeMirror.fromTextArea(textArea.current, {
      lineNumbers: true,
      mode: 'hosts',
    });
    setCodemirror(cm);
    // 设置尺寸
    cm.setSize('100%', '100%');
    // 修改时
    cm.on('change', a => {
      let v = a.getDoc().getValue();
      stash.onActiveContentChange(v);
    });
    cm.on('gutterClick', (c, n) => {
      // 点击行数
    });
  };

  const onActiveContentChange = (val: any): void => {
    if (props.leftBar.length === 0) return;
    let arr: Array<content> = val.split('\n');
    arr = arr.map((el: any) => {
      let index = el.includes(' ') ? el.indexOf(' ') : el.length;
      return {
        host: el.substr(index + 1, el.length),
        ip: el.substr(0, index),
      };
    });
    let leftBar = [...props.leftBar];
    leftBar[props.activeIndex].content = arr;
    props.dispatch({
      type: 'forward/save',
      payload: {
        leftBar,
      },
    });
  };
  stash.onActiveContentChange = onActiveContentChange;

  return (
    <div className={classname(styles.rightContent, styles.codemirror)}>
      <textarea ref={textArea} defaultValue={''}></textarea>
    </div>
  );
}

const mapStateToProps = (state: any) => {
  return {
    leftBar: state.forward.leftBar,
    activeContent: state.forward.activeContent,
    activeIndex: state.forward.activeIndex,
  };
};
export default connect(mapStateToProps)(RightContent);

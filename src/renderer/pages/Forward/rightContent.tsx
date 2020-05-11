import React from 'react';
import { connect } from 'dva';
import { content } from '@/types/forward';
import styles from './index.less';

function RightContent(props: any) {
  const onActiveContentChange = (e: any): void => {
    let arr: Array<content> = e.target.value.split('\n');
    arr = arr.map((el: any) => {
      let index = el.includes(' ') ? el.indexOf(' ') : el.length;
      return {
        host: el.substr(0, index),
        ip: el.substr(index + 1, el.length),
      };
    });

    let leftBar = [...props.leftBar];
    leftBar[props.activeIndex].content = arr;
    props.dispatch({
      type: 'forward/save',
      payload: {
        leftBar,
        activeContent: arr,
      },
    });
  };
  return (
    <div className={styles.rightContent}>
      <div className={styles.rightContentIndex}>
        {props.activeContent.map((el: any, index: number) => {
          return <label key={index}>{index + 1}</label>;
        })}
      </div>
      <textarea
        key={props.activeIndex}
        className={styles.rightContentTextarea}
        defaultValue={props.activeContent
          .map((el: any) => el.host + ' ' + el.ip)
          .join('\n')}
        onChange={onActiveContentChange}
      ></textarea>
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

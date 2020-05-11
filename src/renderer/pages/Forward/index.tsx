import React, { useEffect } from 'react';
import { connect } from 'dva';
import styles from './index.less';
import LeftBar from './leftBar';
import RightContent from './rightContent';

function Forward(props: any) {
  useEffect(() => {
    props.dispatch({
      type: 'forward/getLeftBar',
    });
  }, []);
  return (
    <div className={styles.container}>
      <LeftBar></LeftBar>
      <RightContent></RightContent>
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
export default connect(mapStateToProps)(Forward);

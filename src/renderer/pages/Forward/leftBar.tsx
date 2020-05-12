import React, { useState } from 'react';
import { connect } from 'dva';
import { leftBar } from '@/types/forward';
import styles from './index.less';
import { Switch, Modal, Form, Input } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import classname from 'classname';

function LeftBar(props: any) {
  const [editView, setEditView] = useState(false);
  const [form] = Form.useForm();
  const onLeftItemChange = (state: boolean, index: number): void => {
    let leftBar = [...props.leftBar];
    leftBar[index].open = state;
    props.dispatch({
      type: 'forward/save',
      payload: {
        leftBar,
      },
    });
  };
  const switchActive = (activeIndex: number): void => {
    props.dispatch({
      type: 'forward/switchActive',
      payload: {
        activeIndex,
      },
    });
  };
  const onAddItem = (): void => {
    setEditView(true);
  };
  const onEditBarSubmit = async () => {
    try {
      const values = await form.validateFields();
      let leftBar = [...props.leftBar];
      let activeIndex = leftBar.length;
      let activeContent = [
        {
          host: '',
          ip: '',
        },
      ];
      leftBar.push({
        name: values.name,
        id: leftBar.length + 1,
        open: true,
        content: activeContent,
      });
      props.dispatch({
        type: 'forward/save',
        payload: {
          leftBar,
          activeIndex,
          activeContent,
        },
      });
      setEditView(false);
    } catch (error) {}
  };
  return (
    <div className={styles.leftBar}>
      {props.leftBar.map((el: leftBar, index: number) => {
        return (
          <div
            key={el.id}
            className={classname(
              styles.leftBarItem,
              props.activeIndex === index ? styles.leftBarItemOn : ''
            )}
            onClick={() => switchActive(index)}
          >
            <span>{el.name}</span>
            <Switch
              checked={el.open}
              size="small"
              onClick={(state: boolean) => onLeftItemChange(state, index)}
            ></Switch>
          </div>
        );
      })}
      <div className={styles.leftBarOperation}>
        <PlusOutlined onClick={onAddItem} />
      </div>
      <Modal
        title="编辑"
        visible={editView}
        onOk={onEditBarSubmit}
        onCancel={() => setEditView(false)}
        okText="确认"
        cancelText="取消"
      >
        <Form form={form}>
          <Form.Item
            label="名称"
            name="name"
            rules={[{ required: true, message: '请输入名称！' }]}
          >
            <Input />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
}

const mapStateToProps = (state: any) => {
  return {
    leftBar: state.forward.leftBar,
    activeIndex: state.forward.activeIndex,
  };
};
export default connect(mapStateToProps)(LeftBar);

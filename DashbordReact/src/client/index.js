import React from 'react';
import { Row, Col,Table,Input ,Button ,Modal,Space  } from 'antd';
import 'antd/dist/antd.css';
import { ExclamationCircleOutlined } from '@ant-design/icons';
import axios from 'axios';
const { confirm } = Modal;
const { Search } = Input;
const columns = [
    {
      title: '客户端ID',
      dataIndex: 'name',
      key: 'name',
      fixed: 'left',
    },
    {
      title: '客户端名称',
      dataIndex: 'age',
      key: 'age',
      fixed: 'left',
    },
    {
      title: '秘钥',
      dataIndex: 'address',
      key: '1',
    },
    {
      title: '授权页面',
      dataIndex: 'address',
      key: '2',
    },
    {
      title: '',
      key: 'action',
      render: (text, record) => (
        <Space>
          <a onClick={()=>{}}>编辑</a>
          <Button type="link" danger onClick={showDeleteConfirm}>删除</Button>
          </Space>
      )}
  ];
  
  const data = [];
  for (let i = 0; i < 100; i++) {
    data.push({
      key: i,
      name: `Edrward ${i}`,
      age: 32,
      address: `London Park no. ${i}`,
    });
  }
class Client  extends React.Component {

    constructor(props) {
        super(props);
        this.state = { visible: false }
        this.addClientClickEvent=this.addClientClickEvent.bind(this);
        this.modalHandleOkEvent=this.modalHandleOkEvent.bind(this);
        this.modalHandleCancelEvent=this.modalHandleCancelEvent.bind(this);
    }
    
    addClientClickEvent(e){
        this.setState({
            visible: true,
          });
    }
    //模态框确认的事件
    modalHandleOkEvent=e=>{
        this.setState({
            visible: false,
          });
    }
    //关闭模态框的事件
    modalHandleCancelEvent=e=>{
        this.setState({
            visible: false,
          });
    }
    render() { 
        return (
            <>
            <div>
            <Row>
                <Col span={4}>
                    <div>
                    <Search
                    placeholder="客户端Id/名称"
                    enterButton="搜索"
                    size="large"
                    onSearch={value => alert(value)}
                    />
                    </div>
                </Col>
                <Col span={1} style={{marginLeft:12}}>
                    <div>
                    <Button  size="large" type="primary" onClick={this.addClientClickEvent}>新增客户端</Button>
                    <Modal
                        title="新增客户端"
                        visible={this.state.visible}
                        onOk={this.modalHandleOkEvent}
                        onCancel={this.modalHandleCancelEvent}
                        maskClosable="false"
                        centered="true"
                        >
                        <p>Some contents...</p>
                        <p>Some contents...</p>
                        <p>Some contents...</p>
                    </Modal>
                    </div>
                </Col>
            </Row>
            </div>
            <div style={{marginTop:12}}>
            <Row>
                <Col span={24}>
                <Table columns={columns} bordered  dataSource={data} scroll={{ x: 1500, y: 700  }} />
                </Col>
            </Row>
            </div>
            </>
        );
    }
}

function showDeleteConfirm() {
  confirm({
    title: 'Are you sure delete this task?',
    icon: <ExclamationCircleOutlined />,
    content: 'Some descriptions',
    okText: 'Yes',
    okType: 'danger',
    cancelText: 'No',
    onOk() {
      console.log('OK');
    },
    onCancel() {
      console.log('Cancel');
    },
  });
}

export default Client;
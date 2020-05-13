import React from 'react';
import { Row, Col,Table,Input ,Button ,Modal,Space  } from 'antd';
import 'antd/dist/antd.css';
import { ExclamationCircleOutlined } from '@ant-design/icons';
import AddClient from './add.js';
import axios from 'axios';
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
          <Button type="link" danger onClick={()=>{
            Modal.confirm({
              title: '是否删除此客户端?',
              icon: <ExclamationCircleOutlined />,
              okText: 'Yes',
              okType: 'danger',
              cancelText: 'No',
              onOk() {
                console.log(text);
              },
              onCancel() {
                console.log(text);
              },
            });
          }}>删除</Button>
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
        this.state = { 
          current:1,//table的当前页码
          total:0,
          pageSize:10
         }
    }
    
    //表格页数更改的事件
    changeTableEvent=(page, pageSize)=>{
      this.setState({
        current:page,
        pageSize:pageSize
      });
    }
    //size更改的事件
    sizeChangeEvent=(current, size)=>{
      this.setState({
        current:current,
        pageSize:size
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
                      <AddClient/>
                    </div>
                </Col>
            </Row>
            </div>
            <div style={{marginTop:12}}>
            <Row>
                <Col span={24}>
                <Table columns={columns} bordered  dataSource={data}
                 pagination={{
                  total:this.state.total,
                  showSizeChanger:true,
                  showQuickJumper:true,
                  showTotal:(total)=>`总条数${total}`,
                  current:this.state.current,
                  pageSize:this.state.pageSize,
                  onChange:this.changeTableEvent,
                  onShowSizeChange:this.sizeChangeEvent
                }} />
                </Col>
            </Row>
            </div>
            </>
        );
    }
}

export default Client;
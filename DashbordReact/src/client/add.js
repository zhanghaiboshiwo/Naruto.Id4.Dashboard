import React from 'react';
import 'antd/dist/antd.css';
import { Drawer, Form, Button, Col, Row, Input, Select ,InputNumber } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import  ClientList from './addlist';
const { Option } = Select;


export default class AddClient extends React.Component {

  constructor(props) {
    super(props);
    this.state = { visible: false ,
      childrenDrawer:false
    };
}
  showDrawer = () => {
    this.setState({
      visible: true,
    });
  };

  onClose = () => {
    this.setState({
      visible: false,
    });
  };

  addGrantTypeEvent=()=>{
    this.setState({
      childrenDrawer: true,
    });
  }
  onGrantTypeDrawerClose=()=>{
    this.setState({
      childrenDrawer: false,
    });
  }
  //获取子组件的授权类型数据
  getGrantTypeDate=(data)=>{
    console.log(data);
  }
  render() {
    return (
      <>
        <Button type="primary"  size="large" onClick={this.showDrawer}>
          <PlusOutlined />新增客户端
        </Button>
        <Drawer
          title="新增客户端"
          width={650}
          onClose={this.onClose}
          visible={this.state.visible}
          bodyStyle={{ paddingBottom: 80 }}
          maskClosable={false} 
          footer={
            <div
              style={{
                textAlign: 'right',
              }}
            >
              <Button onClick={this.onClose} style={{ marginRight: 8 }}>
                Cancel
              </Button>
              <Button onClick={this.onClose} type="primary">
                Submit
              </Button>
            </div>
          }
        >
          <Form layout="vertical" hideRequiredMark>
            <Row gutter={24}>
              <Col span={8}>
                <Form.Item
                  name="ClientId"
                  label="客户端Id"
                  rules={[{ required: true, message: '请输入客户端Id' }]}>
                <Input placeholder="请输入客户端Id" />
                </Form.Item>
              </Col>
              <Col span={11} offset={5}>
              <Form.Item
                  name="GrantType"
                  label="授权类型">
              <Button type="primary"  size="large" onClick={this.addGrantTypeEvent}>
              <PlusOutlined />新增 
              </Button>
              <ClientList.ShowGrantTypeDrawer GetData={this.getGrantTypeDate} childrenDrawer={this.state.childrenDrawer} title="授权类型" width={500} onChildrenDrawerClose={this.onGrantTypeDrawerClose}/>
              </Form.Item>
              </Col>
            </Row>
            <Row gutter={24}>
              <Col span={8}>
                <Form.Item
                  name="ClientName"
                  label="客户端名称"
                  rules={[{ required: true, message: '请输入客户端名称' }]}>
                <Input placeholder="请输入客户端名称" />
                </Form.Item>
              </Col>
              <Col span={11} offset={5}>
              <Form.Item
                  name="Scope"
                  label="授权范围">
              <Button type="primary"  size="large">
              <PlusOutlined />新增 
              </Button>
              </Form.Item>
              </Col>
            </Row>
            <Row gutter={24}>
             <Col span={8}>
               <Form.Item
                 name="Description"
                 label="客户端描述"
                 rules={[{  message: '请输入客户端描述' }]}>
               <Input placeholder="请输入客户端描述" />
               </Form.Item>
             </Col>
             <Col span={11} offset={5}>
              <Form.Item
                  name="Origin"
                  label="跨域来源">
              <Button type="primary"  size="large">
              <PlusOutlined />新增 
              </Button>
              </Form.Item>
              </Col>
           </Row>
            <Row gutter={24}>
              <Col span={8}>
                <Form.Item
                  name="ProtocolType"
                  label="协议类型"
                  rules={[{ required: true, message: '' }]}>
                   <Input />
                </Form.Item>
              </Col>
              <Col span={11} offset={5}>
              <Form.Item
                  name="Redirect"
                  label="重定向Uri">
              <Button type="primary"  size="large">
              <PlusOutlined />新增 
              </Button>
              </Form.Item>
              </Col>
            </Row>
            <Row gutter={24}>
              <Col span={8}>
                <Form.Item
                  name="ClientSecretsType"
                  label="加密方式">
                  <Select placeholder="Please choose the type">
                    <Option value="SharedSecret">SharedSecret</Option>
                  </Select>
                </Form.Item>
              </Col>
              <Col span={11} offset={5}>
              <Form.Item
                  name="PostOut"
                  label="注销后重定向Uri">
              <Button type="primary"  size="large">
              <PlusOutlined />新增 
              </Button>
              </Form.Item>
              </Col>
            </Row>
            <Row gutter={24}>
              <Col span={8}>
                <Form.Item
                  name="ClientSecretsValue"
                  label="秘钥"
                  rules={[{ required: true, message: '' }]}>
                   <Input />
                </Form.Item>
              </Col>
            </Row>
            <Row gutter={24}>
              <Col span={8}>
                <Form.Item
                  name="IdentityTokenLifetime"
                  label="身份周期"
                  rules={[{ required: true, message: 'Please choose the approver' }]}>
                <InputNumber min={1} value={3600}  placeholder="单位秒"/>
                </Form.Item>
              </Col>
            </Row>
            <Row gutter={24}>
              <Col span={8}>
                <Form.Item
                  name="AccessTokenLifetime"
                  label="访问周期"
                  rules={[{ required: true, message: 'Please choose the dateTime' }]}>
                 <InputNumber min={1} value={3600} placeholder="单位秒"/>
                </Form.Item>
              </Col>
            </Row>
          </Form>
        </Drawer>
      </>
    );
  }
}


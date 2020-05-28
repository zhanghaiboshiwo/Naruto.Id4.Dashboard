import React from 'react';
import 'antd/dist/antd.css';
import { Drawer, Form, Button, Col, Row, Input, Select ,InputNumber } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import  ChildDrawer from './ChildDrawer';
import axios from 'axios';
const { Option } = Select;


export default class AddClient extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
       visible: false ,
      childrenGrantTypeDrawer:false,
      childrenGrantScopeDrawer:false,
      childrenOriginDrawer:false,
      childrenRedirectUriDrawer:false,
      childrenPostOutRedirectUriDrawer:false,
      grantTypeData:[],
      grantScopeData:[],
      originDrawer:[],
      redirectUriData:[],
      postOutRedirectUriData:[]
    };
  }
  //显示弹出层
  showDrawer = () => {
    this.setState({
      visible: true,
    });
  };
  //关闭弹出层
  onClose = () => {
    this.setState({
      visible: false,
    });
  };
  //新增授权类型事件
  addGrantTypeEvent=()=>{
    this.setState({
      childrenGrantTypeDrawer: true,
    });
  }
  //关闭授权类型事件
  onGrantTypeDrawerClose=()=>{
    this.setState({
      childrenGrantTypeDrawer: false,
    });
  }
  //获取子组件的授权类型数据
  getGrantTypeDate=(data)=>{
    this.setState({
      grantTypeData:data
    });
    console.log(data);
  }
  //保存客户端
  saveClientEvent=(e)=>{
    console.log(this.state);
    //调用接口保存客户端
  }

  //获取子组件的授权范围数据
  getGrantScopeDate=(data)=>{
    this.setState({
      grantScopeData:data
    });
    console.log(data);
  }
  //新增授权范围事件
  addGrantScopeEvent=()=>{
    this.setState({
      childrenGrantScopeDrawer: true,
    });
  }
  //关闭授权范围事件
  onGrantScopeDrawerClose=()=>{
    this.setState({
      childrenGrantScopeDrawer: false,
    });
  }
    //获取子组件的跨域来源数据
    getOriginDate=(data)=>{
      this.setState({
        originData:data
      });
      console.log(data);
    }
    //新增跨域来源事件
    addOriginEvent=()=>{
      this.setState({
        childrenOriginDrawer: true,
      });
    }
    //关闭跨域来源事件
    onOriginDrawerClose=()=>{
      this.setState({
        childrenOriginDrawer: false,
      });
    }
        //获取子组件的重定向url数据
        getRedirectUriDate=(data)=>{
          this.setState({
            redirectUriData:data
          });
          console.log(data);
        }
        //新增重定向url事件
        addRedirectUriEvent=()=>{
          this.setState({
            childrenRedirectUriDrawer: true,
          });
        }
        //关闭重定向url事件
        onRedirectUriDrawerClose=()=>{
          this.setState({
            childrenRedirectUriDrawer: false,
          });
        }

          //获取子组件的重定向url数据
           getPostOutRedirectUriDate=(data)=>{
            this.setState({
              postOutRedirectUriData:data
            });
           }
          //新增重定向url事件
           addPostOutRedirectUriEvent=()=>{
            this.setState({
              childrenPostOutRedirectUriDrawer: true,
            });
          }
          //关闭重定向url事件
          onPostOutRedirectUriDrawerClose=()=>{
            this.setState({
              childrenPostOutRedirectUriDrawer: false,
            });
          }
  //渲染页面
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
                返回
              </Button>
              <Button onClick={this.saveClientEvent} type="primary">
                保存
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
              <ChildDrawer GetData={this.getGrantTypeDate} childrenDrawer={this.state.childrenGrantTypeDrawer} title="授权类型" width={500} onChildrenDrawerClose={this.onGrantTypeDrawerClose}/>
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
              <Button type="primary"  size="large" onClick={this.addGrantScopeEvent}>
              <PlusOutlined />新增 
              </Button>
              <ChildDrawer GetData={this.getGrantScopeDate} childrenDrawer={this.state.childrenGrantScopeDrawer} title="授权范围" width={500} onChildrenDrawerClose={this.onGrantScopeDrawerClose}/>
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
              <Button type="primary"  size="large"  onClick={this.addOriginEvent}>
              <PlusOutlined />新增 
              </Button>
              <ChildDrawer GetData={this.getOriginDate} childrenDrawer={this.state.childrenOriginDrawer} title="跨域来源" width={500} onChildrenDrawerClose={this.onOriginDrawerClose}/>
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
              <Button type="primary"  size="large" onClick={this.addRedirectUriEvent}>
              <PlusOutlined />新增 
              </Button>
              <ChildDrawer GetData={this.getRedirectUriDate} childrenDrawer={this.state.childrenRedirectUriDrawer} title="跨域来源" width={500} onChildrenDrawerClose={this.onRedirectUriDrawerClose}/>
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
              <Button type="primary"  size="large" onClick={this.addPostOutRedirectUriEvent}>
              <PlusOutlined />新增 
              </Button>
              <ChildDrawer GetData={this.getPostOutRedirectUriDate} childrenDrawer={this.state.childrenPostOutRedirectUriDrawer} title="注销后重定向Uri" width={500} onChildrenDrawerClose={this.onPostOutRedirectUriDrawerClose}/>
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


import React from 'react';
import 'antd/dist/antd.css';
import { Drawer, Form, Button, Col, Row, Input, Select ,InputNumber ,message} from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import axios from 'axios';
import config from '../config'

const { Option } = Select;
const {TextArea }=Input;
//配置全局参数
axios.defaults.baseURL=config.apiUrl;

export default class AddResource extends React.Component {
  //构造函数
  constructor(props) {
    super(props);
    this.state = {
      visible: false,
    };
  }
    //关闭弹出层
    onClose = () => {
        this.setState({
          visible: false,
        });
      };

  //显示弹出层
  showDrawer =async () => {
    //更新显示隐藏的状态
    this.setState({
      visible: true,
    });
    //验证是否是编辑页面，是的话从接口获取数据 填充
    if(this.props.id!=null){
     }
  };
  //渲染页面
  render() {
    return (
      <>
      {/* 根据id 修改标题 */}
      {this.props.id==null?
        <Button type="primary"  size="large" onClick={this.showDrawer}>
          <PlusOutlined />新增资源
        </Button>
        :<a onClick={this.showDrawer}>编辑</a>
      }
        <Drawer
          title={this.props.id==null?"新增资源":"编辑资源"}
          width={450}
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
              <Button onClick={()=>this.saveClientEvent(this)} type="primary">
                保存
              </Button>
            </div>
          }
        >
          <Form layout="horizontal">
            <Row gutter={24}>
              <Col>
                <Form.Item
                  label="名　称"
                  labelAlign="left"
                  rules={[{ required: true, message: '请输入名称' }]}>
                <Input placeholder="请输入名称" onChange={(e)=>this.setState({clientId:e.target.value})} value={this.state.clientId}/>
                </Form.Item>
              </Col>
            </Row>
            <Row gutter={24}>
              <Col>
                <Form.Item
                  label="显示名"
                  labelAlign="left"
                  rules={[{ required: true, message: '请输入显示名' }]}>
                <Input placeholder="请输入显示名" onChange={(e)=>this.setState({clientId:e.target.value})} value={this.state.clientId}/>
                </Form.Item>
              </Col>
            </Row>
            <Row gutter={24}>
              <Col>
                <Form.Item
                  label="描　述"
                  labelAlign="left">
                <TextArea rows={4}  placeholder="请输入描述" onChange={(e)=>this.setState({description:e.target.value})} value={this.state.description}/>
                </Form.Item>
              </Col>
            </Row>
            <Row gutter={24}>
              <Col>
                <Form.Item
                  label="Api范围"
                  labelAlign="left">
                 <Button type="dashed"  size="large" onClick={this.addPostOutRedirectUriEvent}>
              <PlusOutlined />{this.props.id==null?"新增":"编辑"}  
              </Button>
                </Form.Item>
              </Col>
            </Row>
            <Row gutter={24}>
              <Col>
                <Form.Item
                  label="Api秘钥"
                  labelAlign="left">
                 <Button type="dashed"  size="large" onClick={this.addPostOutRedirectUriEvent}>
              <PlusOutlined />{this.props.id==null?"新增":"编辑"}  
              </Button>
                </Form.Item>
              </Col>
            </Row>
          </Form>
        </Drawer>
      </>
    );
  }
}


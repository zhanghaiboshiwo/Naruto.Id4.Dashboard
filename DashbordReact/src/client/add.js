import React from 'react';
import 'antd/dist/antd.css';
import { Drawer, Form, Button, Col, Row, Input, Select ,InputNumber ,message} from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import  ChildDrawer from './ChildDrawer';
import axios from 'axios';
import config from '../config'

const { Option } = Select;
const {TextArea }=Input;
//配置全局参数
axios.defaults.baseURL=config.apiUrl;

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
      //存储数据字段
      grantTypeData:[],
      grantScopeData:[],
      originDrawer:[],
      redirectUriData:[],
      postOutRedirectUriData:[],
      originData:[],
      clientId:"",
      clientName:"",
      description:"",
      clientSecrets:[],
      accessTokenLifetime:0,
      identityTokenLifetime:0
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
  saveClientEvent=async (ts)=>{
    console.log(this.state);
    //调用接口保存客户端
   var res= await axios.post("/naruto/client",{
    AllowedGrantTypes:this.state.grantTypeData.map((item,i)=>item.value),
    AllowedScopes:this.state.grantScopeData.map((item,i)=>item.value),
    RedirectUris:this.state.redirectUriData.map((item,i)=>item.value),
    PostLogoutRedirectUris:this.state.postOutRedirectUriData.map((item,i)=>item.value),
    AllowedCorsOrigins:this.state.originData.map((item,i)=>item.value),
    ClientId:this.state.clientId,
    ClientName:this.state.clientName,
    Description:this.state.description,
    ClientSecrets:this.state.clientSecrets,
    AccessTokenLifetime:this.state.accessTokenLifetime,
    IdentityTokenLifetime:this.state.identityTokenLifetime
   });
   if(res.data!=null && res.data.status==0){
      //关闭弹出层
      ts.onClose();
      //刷新父页面
      this.props.onReloadEvent();
      //重新加载表格
      return (message.success('操作成功'));
    }
    else{
      return (message.warning(res.data!=null?res.data.msg:"操作失败"));
    }
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
              <Button onClick={()=>this.saveClientEvent(this)} type="primary">
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
                <Input placeholder="请输入客户端Id" onChange={(e)=>this.setState({clientId:e.target.value})}/>
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
                <Input placeholder="请输入客户端名称" onChange={(e)=>this.setState({clientName:e.target.value})}/>
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
               <TextArea rows={4}  placeholder="请输入客户端描述" onChange={(e)=>this.setState({description:e.target.value})}/>
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
                  name="ClientSecretsValue"
                  label="秘钥"
                  rules={[{ required: true, message: '' }]}>
                   <Input onChange={(e)=>{
                     this.setState({clientSecrets:[e.target.value]});
                   }}/>
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
                  name="IdentityTokenLifetime"
                  label="身份周期"
                  rules={[{ required: true, message: 'Please choose the approver' }]}>
                <InputNumber min={1} defaultValue={300}  placeholder="单位秒" onChange={(value)=>this.setState({identityTokenLifetime:value})}/>
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
                  name="AccessTokenLifetime"
                  label="访问周期"
                  rules={[{ required: true, message: 'Please choose the dateTime' }]}>
                 <InputNumber min={1} defaultValue={3600} placeholder="单位秒" onChange={(value)=>this.setState({accessTokenLifetime:value})}/>
                </Form.Item>
              </Col>
            </Row>
          </Form>
        </Drawer>
      </>
    );
  }
}


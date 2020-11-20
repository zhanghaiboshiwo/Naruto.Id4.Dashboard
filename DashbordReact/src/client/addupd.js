import React from 'react';
import 'antd/dist/antd.css';
import { Drawer, Form, Button, Col, Row, Input, Select ,InputNumber ,message,Tag,Switch} from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import  ChildDrawer from './ChildDrawer';
import axios from 'axios';
import config from '../config'

const { Option } = Select;
const {TextArea }=Input;
//配置全局参数
axios.defaults.baseURL=config.apiUrl;

export default class AddClient extends React.Component {
  //构造函数
  constructor(props) {
    super(props);
    this.state = {
      visible: false,
      initData:[],
      childrenGrantTypeDrawer:false,
      childrenGrantScopeDrawer:false,
      childrenOriginDrawer:false,
      childrenRedirectUriDrawer:false,
      childrenPostOutRedirectUriDrawer:false,
      allowAccessTokensViaBrowser:false,//允许通过浏览器访问令牌
      //存储数据字段
      grantTypeData:[],
      grantScopeData:[],
      redirectUriData:[],
      postOutRedirectUriData:[],
      originData:[],
      clientId:"",
      clientName:"",
      description:"",
      clientSecrets:[],
      accessTokenLifetime:3600,
      identityTokenLifetime:300,

    };
  }

  //显示弹出层
  showDrawer =async () => {
    //更新显示隐藏的状态
    this.setState({
      visible: true,
    });
    //验证是否是编辑页面，是的话从接口获取数据 填充
    if(this.props.id!=null){
      var res=await axios.get(`/naruto/client/${this.props.id}`)
      //验证接口返回参
      if(res.data==null || res.data.status!=0){
        return (message.warning(res.data!=null?res.data.msg:"操作失败"));
      }
      else{
        var clientData=res.data.data;
        //修改数据字段
        var grantTypeData=[];
        var grantScopeData=[];
        var redirectUriData=[];
        var postOutRedirectUriData=[];
        var originData=[];

        clientData.allowedGrantTypes.map((item,i)=>grantTypeData.push({key:Math.random(),value:item}));
        clientData.allowedScopes.map((item,i)=>grantScopeData.push({key:Math.random(),value:item}));
        clientData.redirectUris.map((item,i)=>redirectUriData.push({key:Math.random(),value:item}));
        clientData.postLogoutRedirectUris.map((item,i)=>postOutRedirectUriData.push({key:Math.random(),value:item}));
        clientData.allowedCorsOrigins.map((item,i)=>originData.push({key:Math.random(),value:item}));
        //重新设置数据
        this.setState({
          grantTypeData:grantTypeData,
          grantScopeData:grantScopeData,
          redirectUriData:redirectUriData,
          postOutRedirectUriData:postOutRedirectUriData,
          originData:originData,
          clientId:clientData.clientId,
          clientName:clientData.clientName,
          description:clientData.description,
          clientSecrets:clientData.clientSecrets,
          accessTokenLifetime:clientData.accessTokenLifetime,
          identityTokenLifetime:clientData.identityTokenLifetime,
          allowAccessTokensViaBrowser:clientData.allowAccessTokensViaBrowser
        });
      }
     }
  };
  //关闭弹出层
  onClose = () => {
    this.setState({
      visible: false,
    });
  };
  //新增授权类型事件
  addGrantTypeEvent=async()=>{
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
  }
  //保存客户端
  saveClientEvent=async (ts)=>{
    //调用接口保存客户端
   var res= await axios.post("/naruto/client",{
    Id:this.props.id,
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
    IdentityTokenLifetime:this.state.identityTokenLifetime,
    AllowAccessTokensViaBrowser:this.state.allowAccessTokensViaBrowser
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

    //移除授权类型的初始化数据   
    removeGrantTypeInit=(item)=>{
        //获取数组数据
        var data=  [...this.state.grantTypeData];
        //获取当前下标
        var index=data.indexOf(item);
        if(index>=0){
           data.splice(index,1);
           this.setState({
            grantTypeData:data
           })
        }
    }
        //移除授权范围的初始化数据   
        removeGrantScopeInit=(item)=>{
          //获取数组数据
          var data=  [...this.state.grantScopeData];
          //获取当前下标
          var index=data.indexOf(item);
          if(index>=0){
             data.splice(index,1);
             this.setState({
              grantScopeData:data
             })
          }
      }
              //移除授权范围的初始化数据   
              removeOriginDataInit=(item)=>{
                //获取数组数据
                var data=  [...this.state.originData];
                //获取当前下标
                var index=data.indexOf(item);
                if(index>=0){
                   data.splice(index,1);
                   this.setState({
                    originData:data
                   })
                }
            }
                    //移除授权范围的初始化数据   
                    removeRedirectUriInit=(item)=>{
          //获取数组数据
          var data=  [...this.state.redirectUriData];
          //获取当前下标
          var index=data.indexOf(item);
          if(index>=0){
             data.splice(index,1);
             this.setState({
              redirectUriData:data
             })
          }
      }
              //移除授权范围的初始化数据   
              removePostOutRedirectUriInit=(item)=>{
                //获取数组数据
                var data=  [...this.state.postOutRedirectUriData];
                //获取当前下标
                var index=data.indexOf(item);
                if(index>=0){
                   data.splice(index,1);
                   this.setState({
                    postOutRedirectUriData:data
                   })
                }
            }
  //渲染页面
  render() {
    return (
      <>
      {/* 根据id 修改标题 */}
      {this.props.id==null?
        <Button type="primary"  size="large" onClick={this.showDrawer}>
          <PlusOutlined />新增客户端
        </Button>
        :<a onClick={this.showDrawer}>编辑</a>
      }
        <Drawer
          title={this.props.id==null?"新增客户端":"编辑客户端"}
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
                  label="客户端Id"
                  rules={[{ required: true, message: '请输入客户端Id' }]}>
                <Input placeholder="请输入客户端Id" onChange={(e)=>this.setState({clientId:e.target.value})} value={this.state.clientId}/>
                </Form.Item>
              </Col>
              <Col span={11} offset={5}>
              <Form.Item
                  label="授权类型">
              <Button type="dashed"  size="large" onClick={this.addGrantTypeEvent}>
        <PlusOutlined />{this.props.id==null?"新增":"编辑"} 
              </Button>
              <ChildDrawer msgNotice={
                (<div>
                  <Tag color="blue">implicit（简单模式）oidc  使用js客户端 </Tag>
                <Tag color="blue">hybrid 混合模式（oidc+oauth）</Tag>
                <Tag color="blue">authorization_code 授权码模式</Tag>
                <Tag color="blue">client_credentials 客户端授权模式</Tag>
                <Tag color="blue">password 密码模式</Tag>
                <Tag color="blue">urn:ietf:params:oauth:grant-type:device_code 使用js客户端</Tag>
                </div>)
            } GetData={this.getGrantTypeDate} data={this.state.grantTypeData} removeInit={this.removeGrantTypeInit}  childrenVisible={this.state.childrenGrantTypeDrawer} title="授权类型" width={500} onChildrenDrawerClose={this.onGrantTypeDrawerClose}/>
              </Form.Item>
              </Col>
            </Row>
            <Row gutter={24}>
              <Col span={8}>
                <Form.Item
                  label="客户端名称"
                  rules={[{ required: true, message: '请输入客户端名称' }]}>
                <Input placeholder="请输入客户端名称" onChange={(e)=>this.setState({clientName:e.target.value})} value={this.state.clientName}/>
                </Form.Item>
              </Col>
              <Col span={11} offset={5}>
              <Form.Item
                  label="授权范围">
              <Button type="dashed"  size="large" onClick={this.addGrantScopeEvent}>
              <PlusOutlined />{this.props.id==null?"新增":"编辑"}  
              </Button>
              <ChildDrawer msgNotice={<Tag color="blue">当使用oidc的时候需要添加openid,profile两个范围</Tag>} GetData={this.getGrantScopeDate} data={this.state.grantScopeData} removeInit={this.removeGrantScopeInit} childrenVisible={this.state.childrenGrantScopeDrawer} title="授权范围" width={500} onChildrenDrawerClose={this.onGrantScopeDrawerClose}/>
              </Form.Item>
              </Col>
            </Row>
            <Row gutter={24}>
             <Col span={8}>
               <Form.Item
                 label="客户端描述"
                 rules={[{  message: '请输入客户端描述' }]}>
               <TextArea rows={4}  placeholder="请输入客户端描述" onChange={(e)=>this.setState({description:e.target.value})} value={this.state.description}/>
               </Form.Item>
             </Col>
             <Col span={11} offset={5}>
              <Form.Item
                  label="跨域来源">
              <Button type="dashed"  size="large"  onClick={this.addOriginEvent}>
              <PlusOutlined />{this.props.id==null?"新增":"编辑"}  
              </Button>
              <ChildDrawer GetData={this.getOriginDate} data={this.state.originData} removeInit={this.removeOriginDataInit}   childrenVisible={this.state.childrenOriginDrawer} title="跨域来源" width={500} onChildrenDrawerClose={this.onOriginDrawerClose}/>
              </Form.Item>
              </Col>
           </Row>
            <Row gutter={24}>
              <Col span={8}>
                <Form.Item
                  label="秘钥"
                  rules={[{ required: true, message: '' }]}>
                   <Input onChange={(e)=>{
                     this.setState({clientSecrets:[e.target.value]});
                   }} value={this.state.clientSecrets[0]}/>
                </Form.Item>
              </Col>
              <Col span={11} offset={5}>
              <Form.Item
                  label="重定向Uri">
              <Button type="dashed"  size="large" onClick={this.addRedirectUriEvent}>
              <PlusOutlined />{this.props.id==null?"新增":"编辑"}  
              </Button>
              <ChildDrawer msgNotice={<Tag color="blue">hybrid模式中，需要添加 signin-oidc 地址</Tag>} GetData={this.getRedirectUriDate} data={this.state.redirectUriData} removeInit={this.removeRedirectUriInit}  childrenVisible={this.state.childrenRedirectUriDrawer} title="跨域来源" width={500} onChildrenDrawerClose={this.onRedirectUriDrawerClose}/>
              </Form.Item>
              </Col>
            </Row>
            <Row gutter={24}>
              <Col span={8}>
                <Form.Item
                  label="身份周期(s)"
                  rules={[{ required: true, message: 'Please choose the approver' }]}>
                <InputNumber min={1} defaultValue={this.state.identityTokenLifetime} value={this.state.identityTokenLifetime}  placeholder="单位秒" onChange={(value)=>this.setState({identityTokenLifetime:value})}/>
                </Form.Item>
              </Col>
              <Col span={11} offset={5}>
              <Form.Item
                  label="注销后重定向Uri">
              <Button type="dashed"  size="large" onClick={this.addPostOutRedirectUriEvent}>
              <PlusOutlined />{this.props.id==null?"新增":"编辑"}  
              </Button>
              <ChildDrawer msgNotice={<Tag color="blue">hybrid模式中，需要添加 signout-callback-oidc  地址</Tag>} GetData={this.getPostOutRedirectUriDate} data={this.state.postOutRedirectUriData} removeInit={this.removePostOutRedirectUriInit}  childrenVisible={this.state.childrenPostOutRedirectUriDrawer} title="注销后重定向Uri" width={500} onChildrenDrawerClose={this.onPostOutRedirectUriDrawerClose}/>
              </Form.Item>
              </Col>
            </Row>
            <Row gutter={24}>
              <Col span={8}>
                <Form.Item
                  label="访问周期(s)"
                  rules={[{ required: true, message: 'Please choose the dateTime' }]}>
                 <InputNumber min={1} defaultValue={this.state.accessTokenLifetime} value={this.state.accessTokenLifetime} placeholder="单位秒" onChange={(value)=>this.setState({accessTokenLifetime:value})}/>
                </Form.Item>
              </Col>
            </Row>
            <Row gutter={24}>
              <Col span={8}>
                <Form.Item label="允许通过浏览器访问令牌">
                <Switch checkedChildren="开启" unCheckedChildren="关闭" checked={this.state.allowAccessTokensViaBrowser}  onChange={async (checked,event)=>{
                  this.setState({
                    allowAccessTokensViaBrowser:checked
                  });
                }}/>
                </Form.Item>
              </Col>
            </Row>
          </Form>
        </Drawer>
      </>
    );
  }
}


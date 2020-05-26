import React from 'react';
import { Row, Col,Table,Input ,Button ,Modal,Space ,Switch,message  } from 'antd';
import 'antd/dist/antd.css';
import { ExclamationCircleOutlined ,CloseOutlined, CheckOutlined  } from '@ant-design/icons';
import AddClient from './add.js';
import axios from 'axios';
import config from '../config'
const { Search } = Input;
//配置全局参数
axios.defaults.baseURL=config.apiUrl;
//定义表格的列
const columns = [
    {
      title: '客户端ID',
      dataIndex: 'clientId',
      key: 'clientId',
      fixed: 'left',
    },
    {
      title: '客户端名称',
      dataIndex: 'clientName',
      key: 'clientName',
      fixed: 'left',
    },
    {
      title: '是否需要秘钥',
      key: 'requireClientSecret',
      render: (requireClientSecret, record) => (
        <>
          <Switch checkedChildren="开启" unCheckedChildren="关闭" defaultChecked={requireClientSecret} onChange={async (checked,event)=>{
            console.log(checked);
              //请求接口 更改状态
             var res= await axios.post(`/naruto/client/requireclientsecret/${record.id}`,
             {
                requireClientSecret:checked
             },
             {
              headers:{
                "Content-Type":"application/x-www-form-urlencoded"
              }
             })
             .catch(function (error) {
               console.log(error);
            });
            if(res.data!=null && res.data.status==0){
               return (message.success('操作成功'));
            }
            else{
              return (message.warning("操作失败"));
            }
          }}/>
        </>
      )
    },
    {
      title: '是否需要授权页面',
      dataIndex: 'requireConsent',
      key: 'requireConsent',
      render: (requireConsent, record) => (
        <>
          <Switch checkedChildren="开启" unCheckedChildren="关闭" defaultChecked={requireConsent} onChange={async (checked,event)=>{
               //请求接口 更改状态
             var res= await axios.post(`/naruto/client/requireconsent/${record.id}`,{
              data:{
                requireConsent:checked
              }
             })
             .catch(function (error) {
               console.log(error);
            });
            if(res.data!=null && res.data.status==0){
               return (message.success('操作成功'));
            }
            else{
              return (message.warning("操作失败"));
            }
          }}/>
        </>
      )
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
class Client  extends React.Component {

    constructor(props) {
        super(props);
        this.state = { 
          current:1,//table的当前页码
          total:0,//总条数
          pageSize:10,
          keyword:"",
          data:[]
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
    //进行ajax请求
    async componentDidMount() {
      await this.getDataAsync(this.state.keyword);
    }
    //获取数据
    getDataAsync=async(keyword)=>{
      var res= await axios.get(`/naruto/client?keyword=${keyword}&page=${this.state.current}&pagesize=${this.state.pageSize}`);
      if(res.status==200){
       //批量往数组追加key
       var data=[...res.data.data];
       data.map((value,index)=>{
         value.key=index;
       });
       //设置数据
       this.setState({
         data:data,
         total:res.data.recordCount
       });
     }
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
                    onSearch={async value =>{
                      this.setState({
                        keyword:value
                      });
                      await this.getDataAsync(value);
                    }}
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
                <Table columns={columns} bordered  dataSource={this.state.data}
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
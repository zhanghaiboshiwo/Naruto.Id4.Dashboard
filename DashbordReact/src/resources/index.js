import React from 'react';
import { Row, Col,Table,Input ,Button ,Modal,Space ,Switch,message  } from 'antd';
import 'antd/dist/antd.css';
import { ExclamationCircleOutlined  } from '@ant-design/icons';
import AddUpdResources from './addupd.js';
import axios from 'axios';
import config from '../config'
import qs from 'qs'
const { Search } = Input;
const {Column} =Table;
//配置全局参数
axios.defaults.baseURL=config.apiUrl;
//客户端组件
export default class Resources  extends React.Component {

    constructor(props) {
        super(props);
        this.state = { 
          current:1,//table的当前页码
          total:0,//总条数
          pageSize:10,
          keyword:"",
          data:[],
          loading:false
         }
    }
    
    //表格页数更改的事件
    changeTableEvent=async(page, pageSize)=>{
      //更新状态机
      this.setState({
        current:page,
        pageSize:pageSize
      });
      //更新数据
      await this.getDataAsync(this.state.keyword,page,pageSize);
    }
    //size更改的事件
   sizeChangeEvent=async(current, size)=>{
      //更新状态机
      this.setState({
        current:current,
        pageSize:size
      });
      //更新数据
      await this.getDataAsync(this.state.keyword,current,size);
    }
    //进行ajax请求
    async componentDidMount() {
      await this.getDataAsync(this.state.keyword,this.state.current,this.state.pageSize);
    }
    //获取数据
    getDataAsync=async(keyword,page,pageSize)=>{
      //开启加载框
      this.setState({ loading: true });
      var res= await axios.get(`/naruto/resources?keyword=${keyword}&page=${page}&pagesize=${pageSize}`);
      if(res.status==200){
       //批量往数组追加key
       var data=[...res.data.data];
       data.map((value,index)=>{
         value.key=index;
       });
       //设置数据
      await this.setState({
         data:data,
         total:res.data.recordCount
       });
     }
     //关闭加载框
     this.setState({ loading: false });
    }


    //渲染
    render() { 
        return (
            <>
            <div>
            <Row>
                <Col span={4}>
                    <div>
                    <Search
                    placeholder="名称"
                    enterButton="搜索"
                    size="large"
                    onSearch={async value =>{
                      this.setState({
                        keyword:value
                      });
                      await this.getDataAsync(value,1,this.state.pageSize);
                      this.setState({current:1});
                    }}
                    />
                    </div>
                </Col>
                <Col span={1} style={{marginLeft:12}}>
                    <div>
                      {/* <AddUpdResources onReloadEvent={async()=>{
                        await this.getDataAsync(this.state.keyword,1,this.state.pageSize);
                        this.setState({current:1});
                      }}/> */}
                    </div>
                </Col>
            </Row>
            </div>
            <div style={{marginTop:12}}>
            <Row>
                <Col span={24}>
                <Table bordered  dataSource={this.state.data}
                 loading={this.state.loading}
                 pagination={{
                  total:this.state.total,
                  showSizeChanger:true,
                  showQuickJumper:true,
                  showTotal:(total)=>`每页${this.state.pageSize}条, 共 ${total} 条`,
                  current:this.state.current,
                  pageSize:this.state.pageSize,
                  onChange:this.changeTableEvent,
                  onShowSizeChange:this.sizeChangeEvent
                }} >
              
                  <Column  title='名称' dataIndex= 'name' key='name'  fixed='left'/>
                
                  <Column  title='是否启用' dataIndex= 'enabled' key='enabled'  render={(enabled, record) => (
                  <>
                    <Switch checkedChildren="启用" unCheckedChildren="禁用" checked={enabled} onChange={async (checked,event)=>{
                        //请求接口 更改状态
                      var res= await axios.post(`/naruto/resources/enabled/${record.id}`,qs.stringify({enabled:checked}) )
                                          .catch(function (error) {
                                            console.log(error);
                                          });
                      if(res.data!=null && res.data.status==0){
                        //重新加载表格
                        await this.getDataAsync(this.state.keyword,this.state.current,this.state.pageSize);
                        return (message.success('操作成功'));
                      }
                      else{
                        return (message.warning("操作失败"));
                      }
                    }}/>
                  </> )}/>
                  <Column  title='描述' dataIndex= 'description' key='description'  fixed='left'/>
                  <Column  title='创建时间' dataIndex= 'created' key='created'  fixed='left'/>
                  <Column  title='更新时间' dataIndex= 'updated' key='updated'  fixed='left'/>
                  <Column   dataIndex= 'action' key='action'  render={(text, record) => (
                  <Space>
                  {/* 编辑按钮 */}
                    {/* <AddUpdResources onReloadEvent={async()=>{
                      await this.getDataAsync(this.state.keyword,1,this.state.pageSize);
                      this.setState({current:1});
                    }} id={record.id}/> */}
                <Button type="link" danger onClick={()=>this.deleteClientEvent(text, record,this)}>删除
                  </Button></Space>)}/>
                  </Table>
                </Col>
            </Row>
            </div>
            </>
        );
    }
}

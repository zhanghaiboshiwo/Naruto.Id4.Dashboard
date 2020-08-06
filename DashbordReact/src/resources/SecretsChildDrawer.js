import React from 'react';
import 'antd/dist/antd.css';
import { Drawer, Button, Input,Table,DatePicker } from 'antd';
const {Column} =Table;

// 授权类型弹出层
export default class ChildDrawer extends React.Component {
    constructor(props) {
      super(props);
      this.state = { 
        data:[]
      }
      console.log(this.props.data);
    }
    //添加数据
    pushList=()=>{
      const data = [...this.state.data];
      data.push(
        {
          key:Math.random(),
          value:"",
          expiration:""
      })
      this.setState({
        data: data
      });
    };
        //输入框的事件
        inputChangeEvent=(index,record,key,e)=>{
          //获取数组数据
          var data=  [...this.state.data];
          if(index>=0){
            //更新数据
            record[key]=e.target.value;
           //修改数组
            data[index]=record;
            //更新重新状态
             this.setState({
               data: data
             });
          }
        }
         //修改的table输入框的事件
         initInputChangeEvent=(index,record,key,e)=>{
          //获取数组数据
          var data=  [...this.props.data];
          if(index>=0){
            //更新数据
            record[key]=e.target.value;
           //修改数组
            data[index]=record;
          }
        }

        dateChangeEvent=(index,record,key,nowValue)=>{
          console.log(nowValue);
           //获取数组数据
           var data=  [...this.state.data];
           if(index>=0){
             //更新数据
             record[key]=nowValue;
            //修改数组
             data[index]=record;
             //更新重新状态
              this.setState({
                data: data
              });
           }
           console.log(data);
        };

        initDateChangeEvent=(index,record,key,nowValue)=>{
           //获取数组数据
           var data=  [...this.props.data];
           if(index>=0){
             //更新数据
             record[key]=nowValue;
            //修改数组
             data[index]=record;
           }
        };
      
      
        //保存数据
        okEvent=()=>{
          console.log(this.props.data);
          //合并两个数组 已存在的数据和 添加的数据
          var data=[...this.state.data,...this.props.data];
          //将数据传递给父组件
          this.props.GetData(data);
          //将当前页面的值清空
          this.setState({
           data:[]
          });
          console.log(data);
          //关闭当前窗体
          this.props.onChildrenDrawerClose();
        }
        //删除数据
        delete=(index)=>{
            //获取数组数据
            var data=  [...this.state.data];
            data.splice(index,1)
            this.setState({
              data: data
            }); 
        }
         //删除数据
         initDelete=(index)=>{
          this.props.removeInit(index);
      }
    render() { 
      return (  
        <Drawer
        title={this.props.title}
        width={this.props.width}
        closable={true}
        maskClosable={false} 
        destroyOnClose
        onClose={()=>{
          //清空数据
          this.setState({
            data:[]
          });
          this.props.onChildrenDrawerClose();
        }}
        footer={
          <div
            style={{
              textAlign: 'right',
            }}>
            <Button onClick={this.pushList} style={{ marginRight: 8 }}>
              追加
            </Button>
            <Button  type="primary" onClick={this.okEvent}>
              确认
            </Button>
          </div>
        }
      visible={this.props.childrenVisible}> {/* 显示隐藏*/}

        {/* 修改赋值操作 */}
        <Table dataSource={this.props.data} pagination={false} locale={{	emptyText: ' '}}>
          <Column  title='秘钥' dataIndex= 'value' key='value'  fixed='left' render={(text, record, index)=>(
            <><Input defaultValue={record.value}  onChange={e=>this.initInputChangeEvent(index,record,"value",e)}/></>
          )}/>
          <Column  title='过期时间' dataIndex= 'expiration' key='expiration'  fixed='left' render={(text,record, index)=>(
            <><DatePicker defaultValue={record.expiration} onChange={(moment,value)=>this.initDateChangeEvent(index,record,"expiration",value)}/></>
          )}/>
           <Column  dataIndex= 'action' key='action'  render={(text, record,index) => (
                  <>
                <Button type="link" danger onClick={()=>this.initDelete(index)}>删除
                  </Button></>)}/>
        </Table>

        {/* 新增操作 */}
        <Table dataSource={(this.state.data)} pagination={false}  locale={{	emptyText: ' '}}>
          <Column   dataIndex= 'value' key='value'  fixed='left' render={(text, record, index)=>(
            <><Input  defaultValue={record.value} onChange={e=>this.inputChangeEvent(index,record,"value",e)}/></>
          )}/>
          <Column   dataIndex= 'expiration' key='expiration'  fixed='left' render={(text,record, index)=>(
            <><DatePicker showTime defaultValue={record.expiration} onChange={(moment,value)=>this.dateChangeEvent(index,record,"expiration",value)}/></>
          )}/>
           <Column  dataIndex= 'action' key='action'  render={(text, record,index) => (
                  <>
                <Button type="link" danger onClick={()=>this.delete(index)}>删除
                  </Button></>)}/>
        </Table>
      </Drawer>
      );
    }
  }

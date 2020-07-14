import React from 'react';
import 'antd/dist/antd.css';
import { Drawer, Button, Input,Table,Switch } from 'antd';
const {Column} =Table;
// 授权类型弹出层
export default class ChildDrawer extends React.Component {
    constructor(props) {
      super(props);
      this.state = { 
        data:[]
      }
    }
    //添加数据
    pushList=()=>{
      const data = [...this.state.data];
      data.push(
        {
          key:Math.random(),
          name:"",
          displayName:"",
          description:"",
          required:false
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
        //切换框的事件
        switchChangeEvent=(index,record,checked)=>{
           //获取数组数据
           var data=  [...this.state.data];
           if(index>=0){
             //更新数据
             record["required"]=checked;
            //修改数组
             data[index]=record;
             //更新重新状态
              this.setState({
                data: data
              });
           }
        }
        okEvent=()=>{
          console.log(this.state.data);
        }
        //删除数据
        delete=(index)=>{
            //获取数组数据
            var data=  [...this.state.data];
            data.splice(index,1)
            this.setState({
              data: data
            }); 
            console.log(data);
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

        <Table dataSource={this.state.data} pagination={false}>
          <Column  title='范围名称' dataIndex= 'name' key='name'  fixed='left' render={(text, record, index)=>(
            <><Input  onChange={e=>this.inputChangeEvent(index,record,"name",e)}/></>
          )}/>
          <Column  title='显示名' dataIndex= 'displayName' key='displayName'  fixed='left' render={(text,record, index)=>(
            <><Input onChange={e=>this.inputChangeEvent(index,record,"displayName",e)}/></>
          )}/>
          <Column  title='描述' dataIndex= 'description' key='description'  fixed='left' render={(text, record, index)=>(
            <><Input onChange={e=>this.inputChangeEvent(index,record,"description",e)}/></>
          )}/>
          <Column  title='是否显示屏幕' dataIndex= 'required' key='required'  fixed='left' render={(text, record, index)=>(
            <> <Switch checkedChildren="是" unCheckedChildren="否" onChange={(checked,event)=>{this.switchChangeEvent(index,record,checked)}}/></>
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

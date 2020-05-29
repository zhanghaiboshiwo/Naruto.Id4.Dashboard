import React from 'react';
import 'antd/dist/antd.css';
import { Drawer, Button, Input,List } from 'antd';

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
      data.push({key:Math.random()})
      this.setState({
        data: data
      });
    };
    //输入框的事件
    inputChangeEvent=(item,e)=>{
      //获取数组数据
      var data=  [...this.state.data];
      //获取当前下标
      var index=data.indexOf(item);
      if(index>=0){
        //更新数据
       item.value=e.target.value;
       //修改数组
        data.splice(index,1,item);
        //更新重新状态
         this.setState({
           data: data
         });
      }
    }
    //移除
    removeOnClick=(item)=>{
      //获取数组数据
     var data=  [...this.state.data];
     //获取当前下标
     var index=data.indexOf(item);
     if(index>=0){
        data.splice(index,1);
        this.setState({
          data: data
        });
     }
    }

    //确认事件
    okEvent=(e)=>{
      this.props.GetData(this.state.data);
      //调用父组件的方法关闭当前层
      this.props.onChildrenDrawerClose();
    }
    render() { 
      return (  
        <Drawer
        title={this.props.title}
        width={this.props.width}
        closable={true}
        maskClosable={false} 
        destroyOnClose={true}
        onClose={this.props.onChildrenDrawerClose}
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
      visible={this.props.childrenDrawer}> {/* 显示隐藏*/}
       <List
      itemLayout="horizontal"
      dataSource={this.state.data}
      renderItem={item => (
        <List.Item actions={[<a key={item.Id} onClick={e=>this.removeOnClick(item)}>删除</a>]}> 
          <List.Item.Meta
            description={<Input  defaultValue={item.value}  onChange={e=>this.inputChangeEvent(item,e)}/>}
          />
        </List.Item>
      )}
    />
      </Drawer>
      );
    }
  }

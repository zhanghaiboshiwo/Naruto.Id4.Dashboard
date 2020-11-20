import React from 'react';
import 'antd/dist/antd.css';
import { Drawer, Button, Input,List,Tag } from 'antd';

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
       console.log(item);
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
        //移除初始化数据s
        removeInitOnClick=(item)=>{
         this.props.removeInit(item);
        }

    //确认事件
    okEvent=(e)=>{
      var data= [...this.state.data,...this.props.data];
      this.props.GetData(data);
      console.log(data);
       //清空数据
       this.setState({
        data:[]
      });
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
      {/* 提示信息 */}
        {this.props.msgNotice}
       <List
       locale={{	emptyText: ' '}} //设置数据为空的时候默认展示的内容
      itemLayout="horizontal"
      dataSource={this.props.data}
      renderItem={item => (
        <List.Item actions={[<a key={item.Id} onClick={e=>this.removeInitOnClick(item)}>删除</a>]}> 
          <List.Item.Meta
            description={<Input  defaultValue={item.value} />}
          />
        </List.Item>
      )}/>
      
     <List
      itemLayout="horizontal"
       locale={{emptyText: ' '}}
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

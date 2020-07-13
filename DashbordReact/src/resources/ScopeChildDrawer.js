import React from 'react';
import 'antd/dist/antd.css';
import { Drawer, Button, Input,Table } from 'antd';
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
      data.push({key:Math.random()})
      this.setState({
        data: data
      });
    };
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
             <Input>aaaa</Input>
          )}/>
          <Column  title='显示名' dataIndex= 'displayName' key='displayName'  fixed='left'/>
          <Column  title='描述' dataIndex= 'description' key='description'  fixed='left'/>
          <Column  title='是否显示屏幕' dataIndex= 'description' key='description'  fixed='left'/>
        </Table>;
      </Drawer>
      );
    }
  }

import React from 'react';
import './App.css';
import 'antd/dist/antd.css';
import { Layout, Menu, Breadcrumb } from 'antd';
import Client from './client/index.js';
import Resources from './resources/index.js';

const { Header, Content, Footer } = Layout;


class App extends React.Component {

  constructor(props) {
    super(props);
    this.state = { menuItem:<Client/> }
    this.menuClickEvent=this.menuClickEvent.bind(this);
  }
  //菜单点击事件
   menuClickEvent({ item, key, keyPath, domEvent }){
      if(key=="client"){
          this.setState({
            menuItem:<Client/>
          });
      }
      if(key=="resource"){
        this.setState({
          menuItem:<Resources/>
        });
    }
  };

  render() { 
    return (
        <Layout>
            <Header style={{ position: 'fixed', zIndex: 1, width: '100%' }}>
              <div className="logo" />
              <Menu theme="dark" mode="horizontal" defaultSelectedKeys={['client']}>
                <Menu.Item key="client" onClick={this.menuClickEvent}>客户端</Menu.Item>
                <Menu.Item key="resource" onClick={this.menuClickEvent}>资源</Menu.Item>
              </Menu>
            </Header>
            <Content className="site-layout" style={{ padding: '0 50px', marginTop: 64 }}>
              <Breadcrumb style={{ margin: '16px 0' }}>
              </Breadcrumb>
              <div className="site-layout-background" style={{ padding: 24, minHeight:document.body.clientHeight-150 }}>
               {this.state.menuItem}
              </div>
            </Content>
            <Footer style={{ textAlign: 'center' }}>Naruto.Id4.Dashbord ©2020 Created by zhanghaibo</Footer>
          </Layout>
    );
  }
}

export default App;

import React, { Component } from 'react';
import { Route } from "react-router-dom";
import { TabBar, Drawer, Icon } from 'antd-mobile';
import Theme from '../utils/theme';

import Home from './home/index';
import TabPingji from './tabPingji';
import TabData from './tabData';
import TabYulun from './tabYulun';
import TabFind from './tabFind';
import AppDown from './appdown/'
import Sidebar from './sidebar/'

class TabBars extends Component {
    static defaultProps = {
        selectedColor: '#666',
        normalColor: '#666',
        size: 22,
    };
    constructor(props) {
        super(props);
        this.state = {
            hidden: false,
            openDrawer: false,
        };
        this.onOpenChange = this.onOpenChange.bind(this)
    }
    onOpenChange = (...args) => {
        this.setState({ openDrawer: !this.state.openDrawer });
    }
    render() {
        const { selectedColor, normalColor } = this.props;
        const pathname = this.props.location.pathname;
        const history = this.props.history;
        return (
            <div className='da'>
                <Drawer
                    className="drawer"
                    style={{ minHeight: document.documentElement.clientHeight }}
                    enableDragHandle
                    sidebarStyle={{ backgroundColor: '#fff', width: '80%', opacity: 0.97, zIndex: 1002 }}
                    overlayStyle={{ zIndex: 1001 }}
                    contentStyle={{ color: '#A6A6A6', textAlign: 'center', paddingTop: 42 }}
                    dragHandleStyle={{ width: 0 }}
                    sidebar={<Sidebar history={history} />}
                    open={this.state.openDrawer}
                    onOpenChange={this.onOpenChange}
                >
                    <div></div>
                </Drawer>
                <TabBar
                    unselectedTintColor="#7a7e84"
                    tintColor="#5a6067"
                    barTintColor="#f8f8f8"
                    hidden={this.state.hidden}
                >
                    <TabBar.Item
                        title="首页"
                        key="首页"
                        icon={
                            <Icon type={require('../assets/icons/new/tab/tab-home.svg')} color={normalColor} />
                        }
                        selectedIcon={
                            <Icon type={require('../assets/icons/new/tab/tab-homeOn.svg')} color={selectedColor} />
                        }
                        selected={pathname === '/'}
                        onPress={() => {
                            history.push("/");
                        }}
                    >
                        <Home history={history} onOpenChange={this.onOpenChange} />
                        {/* <Route path="/" component={Home} /> */}
                    </TabBar.Item>
                    <TabBar.Item
                        icon={
                            <Icon type={require('../assets/icons/new/tab/tab-rank.svg')} color={normalColor} />
                        }
                        selectedIcon={
                            <Icon type={require('../assets/icons/new/tab/tab-rankOn.svg')} color={selectedColor} />
                        }
                        title="评级"
                        key="评级"
                        selected={pathname === '/tabPingji'}
                        onPress={() => {
                            history.push("/tabPingji");
                        }}
                    >
                        <TabPingji history={history} onOpenChange={this.onOpenChange} />

                    </TabBar.Item>
                    <TabBar.Item
                        badge={'New'}
                        icon={
                            <Icon type={require('../assets/icons/new/tab/tab-yulun.svg')} color={normalColor} />
                        }
                        selectedIcon={
                            <Icon type={require('../assets/icons/new/tab/tab-yulunOn.svg')} color={selectedColor} />
                        }
                        title="舆情"
                        key="舆情"
                        selected={pathname === '/tabYulun'}
                        onPress={() => {
                            history.push("/tabYulun");
                        }}
                    >
                        <TabYulun history={history} onOpenChange={this.onOpenChange} />
                    </TabBar.Item>
                    <TabBar.Item
                        icon={
                            <Icon type={require('../assets/icons/new/tab/tab-data.svg')} color={normalColor} />
                        }
                        selectedIcon={
                            <Icon type={require('../assets/icons/new/tab/tab-dataOn.svg')} color={selectedColor} />
                        }
                        title="数据"
                        key="数据"
                        selected={pathname === '/tabData'}
                        onPress={() => {
                            history.push("/tabData");
                        }}
                    >
                        <TabData history={history} onOpenChange={this.onOpenChange} />
                    </TabBar.Item>
                   

                    <TabBar.Item
                        icon={
                            <Icon type={require('../assets/icons/new/tab/tab-appDown.svg')} color={normalColor} />
                        }
                        selectedIcon={
                            <Icon type={require('../assets/icons/new/tab/tab-appDown.svg')} color={selectedColor} />
                        }
                        title="APP"
                        key="APP"
                        selected={pathname === '/about/appdown'}
                        onPress={() => {
                            history.push("/about/appdown");
                        }}
                    >
                        <Route path="/about/appdown" component={AppDown} />
                    </TabBar.Item>
                    <TabBar.Item
                        icon={
                            <Icon type={require('../assets/icons/new/tab/tab-find.svg')} color={normalColor} />
                        }
                        selectedIcon={
                            <Icon type={require('../assets/icons/new/tab/tab-findOn.svg')} color={selectedColor} />
                        }
                        title="发现"
                        key="发现"
                        selected={pathname === '/tabFind'}
                        onPress={() => {
                            history.push("/tabFind");
                        }}
                    >
                        <TabFind history={history} onOpenChange={this.onOpenChange} />
                    </TabBar.Item>
                </TabBar>
            </div>
        );
    }

}

export default TabBars;

import React, { Component } from 'react';
import { TabBar, Icon } from 'antd-mobile';

import Home from './home/index'
import Yulun from './yulun/index'
import Fund from './fund/index'
import FlmfList from './flmfList/index'
import Account from './account/index'
import AppDown from './appdown/'

class TabBars extends Component {
    static defaultProps = {
        selectedColor: '#5a6067',
        normalColor: '#7a7e84',
        size: 22,
    };
    constructor(props) {
        super(props);
        this.state = {
            selectedTab: 'homeTab',
            hidden: false,
        };
    }

    render() {
        const { selectedColor, normalColor } = this.props;
        return (

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
                        <Icon type={require('../assets/icons/home-circle-o.svg')} color={normalColor} />
                    }
                    selectedIcon={
                        <Icon type={require('../assets/icons/home-circle.svg')} color={selectedColor} />
                    }
                    selected={this.state.selectedTab === 'homeTab'}
                    onPress={() => {
                        this.setState({
                            selectedTab: 'homeTab',
                        });
                    }}
                >
                    <Home />
                </TabBar.Item>
                <TabBar.Item
                    icon={
                        <Icon type={require('../assets/icons/yuqing-circle-o.svg')} color={normalColor} />
                    }
                    selectedIcon={
                        <Icon type={require('../assets/icons/yuqing-circle.svg')} color={selectedColor} />
                    }
                    title="舆情"
                    key="舆情"
                    selected={this.state.selectedTab === 'yuqingTab'}
                    onPress={() => {
                        this.setState({
                            selectedTab: 'yuqingTab',
                        });
                    }}
                >
                    <Yulun />
                </TabBar.Item>
                <TabBar.Item
                    icon={
                        <Icon type={require('../assets/icons/fund-circle-o.svg')} color={normalColor} />
                    }
                    selectedIcon={
                        <Icon type={require('../assets/icons/fund-circle.svg')} color={selectedColor} />
                    }
                    title="示范"
                    key="示范"
                    selected={this.state.selectedTab === 'fundTab'}
                    onPress={() => {
                        this.setState({
                            selectedTab: 'fundTab',
                        });
                    }}
                >
                    <Fund />
                </TabBar.Item>
                <TabBar.Item
                    icon={
                        <Icon type={require('../assets/icons/activity-circle-o.svg')} color={normalColor} />
                    }
                    selectedIcon={
                        <Icon type={require('../assets/icons/activity-circle.svg')} color={selectedColor} />
                    }
                    title="活动"
                    key="活动"
                    selected={this.state.selectedTab === 'activityTab'}
                    onPress={() => {
                        this.setState({
                            selectedTab: 'activityTab',
                        });
                    }}
                >
                    <FlmfList />
                </TabBar.Item>

                <TabBar.Item
                    icon={
                        <Icon type={require('../assets/icons/appDown.svg')} color={normalColor} />
                    }
                    selectedIcon={
                        <Icon type={require('../assets/icons/appDown.svg')} color={selectedColor} />
                    }
                    title="APP"
                    key="APP"
                    selected={this.state.selectedTab === 'appdownTab'}
                    onPress={() => {
                        this.setState({
                            selectedTab: 'appdownTab',
                        });
                    }}
                >
                    <AppDown />
                </TabBar.Item>
                <TabBar.Item
                    icon={
                        <Icon type={require('../assets/icons/personal-circle-o.svg')} color={normalColor} />
                    }
                    selectedIcon={
                        <Icon type={require('../assets/icons/personal-circle.svg')} color={selectedColor} />
                    }
                    title="我"
                    key="我"
                    selected={this.state.selectedTab === 'personalTab'}
                    onPress={() => {
                        this.setState({
                            selectedTab: 'personalTab',
                        });
                    }}
                >
                    <Account />
                </TabBar.Item>
            </TabBar>



        );
    }
}

export default TabBars;

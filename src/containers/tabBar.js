import React, { Component } from 'react';
import { Route } from "react-router-dom";
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
            hidden: false,
        };
    }

    render() {
        const { selectedColor, normalColor } = this.props;
        const pathname = this.props.location.pathname;
        const history = this.props.history;
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
                    selected={pathname === '/'}
                    onPress={() => {
                        history.push("/");
                    }}
                >
                    <Route path="/" component={Home} />
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
                    selected={pathname === '/yulun'}
                    onPress={() => {
                        history.push("/yulun");
                    }}
                >
                    <Route path="/yulun" component={Yulun} />
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
                    selected={pathname === '/fund'}
                    onPress={() => {
                        history.push("/fund");
                    }}
                >
                    <Route path="/fund" component={Fund} />
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
                    selected={pathname === '/activity'}
                    onPress={() => {
                        history.push("/activity");
                    }}
                >
                    <Route path="/activity" component={FlmfList} />
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
                    selected={pathname === '/about/appdown'}
                    onPress={() => {
                        history.push("/about/appdown");
                    }}
                >
                    <Route path="/about/appdown" component={AppDown} />
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
                    selected={pathname === '/member'}
                    onPress={() => {
                        history.push("/member");
                    }}
                >
                    <Route path="/member" component={Account} />
                </TabBar.Item>
            </TabBar>



        );
    }
}

export default TabBars;
